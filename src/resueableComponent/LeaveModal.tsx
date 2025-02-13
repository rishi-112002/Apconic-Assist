import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';

// Leave Modal Component
const LeaveModal = (props: { visible: any, onClose: any, employeeId: any }) => {
    const {employeeId,onClose,visible} = props
    const [selectedDates, setSelectedDates] = useState({});
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle Date Selection
    const handleDateSelect = (date: any) => {
        if (!fromDate || (fromDate && toDate)) {
            setFromDate(date);
            setToDate(null);
            setSelectedDates({ [date]: { selected: true, color: '#FF5733', textColor: '#FFF' } });
        } else {
            setToDate(date);

            // Highlight range selection
            const newDates = {};
            let start = new Date(fromDate);
            let end = new Date(date);

            if (start > end) [start, end] = [end, start]; // Swap if reversed

            while (start <= end) {
                const key = format(start, 'yyyy-MM-dd');
                newDates[key] = { selected: true, color: '#FF5733', textColor: '#FFF' };
                start.setDate(start.getDate() + 1);
            }

            setSelectedDates(newDates);
        }
    };

    // Firestore Update Function
    const updateOnLeaveStatus = async () => {
        if (!fromDate) {
            Alert.alert('Error', 'Please select a leave date.');
            return;
        }

        setLoading(true);
        try {
            const employeeRef = firestore().collection('employees').doc(employeeId);

            await firestore().runTransaction(async (transaction) => {
                const employeeDoc = await transaction.get(employeeRef);

                if (!employeeDoc.exists) throw new Error('Employee not found');

                const employeeData = employeeDoc.data();

                // Check if leave overlaps with existing leave
                if (employeeData?.leaveDetails) {
                    const { from, to } = employeeData.leaveDetails;
                    if (
                        (fromDate >= from && fromDate <= to) || // New From is within existing range
                        (toDate && toDate >= from && toDate <= to) || // New To is within existing range
                        (fromDate <= from && toDate !== null && toDate >= to) // New range completely covers existing range
                    ) {
                        throw new Error('Overlapping leave dates detected');
                    }
                }

                // Update employee document
                transaction.update(employeeRef, {
                    currentStatus: 'OnLeave',
                    leaveDetails: { from: fromDate, to: toDate || fromDate },
                });

                // Add log entry
                const logRef = employeeRef.collection('statusLogs').doc();
                transaction.set(logRef, {
                    status: 'OnLeave',
                    from: fromDate,
                    to: toDate || fromDate,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                });
            });

            Alert.alert('Success', 'Leave status updated successfully.');
            onClose();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.header}>Select Leave Dates</Text>

                    <Calendar
                        markedDates={selectedDates}
                        onDayPress={(day: any) => handleDateSelect(day.dateString)}
                        theme={{
                            selectedDayBackgroundColor: '#FF5733',
                            todayTextColor: '#FF5733',
                            arrowColor: '#FF5733',
                        }}
                    />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={updateOnLeaveStatus}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Confirm'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// Styles
const styles = {
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        width: '90%',
        padding: 20,
        borderRadius: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#FF5733',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
};

export default LeaveModal;



