import DateTimePicker from 'react-native-ui-datepicker';
import React, { useState, useEffect } from 'react';
import { Modal, Text, View } from 'react-native';
import { STYLES } from '../styles/ScreenStyles';
import colors from '../assest/color/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

export default function CustomDateTimePicker(props: { visible: any, onClose: any, onDateSelect: any }) {
    const { visible, onClose, onDateSelect } = props;

    // States for controlling the picker modals
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    // Selected Dates
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);

    // Open From Picker when the main modal opens
    useEffect(() => {
        if (visible) {
            setShowFromPicker(true);
        }
    }, [visible]);

    // Format Date Function
    const formatDate = (date: Date) => {
        return date.toLocaleString('en-US', {
            month: 'long',   // Full month name (e.g., February)
            day: 'numeric',  // Day of the month (e.g., 13)
            year: 'numeric', // Full year (e.g., 2025)
            hour: 'numeric', // Hour (e.g., 4)
            minute: '2-digit', // Minute with leading zero if needed (e.g., 23)
            second: '2-digit', // Second with leading zero if needed (e.g., 12)
            hour12: true,    // Use 12-hour format with AM/PM
        }).replace(',', '') // Remove extra comma after the month
          .replace('AM', 'AM').replace('PM', 'PM'); // Ensure proper spacing
    };
    

    const handleDateChange = (params: any, type: 'from' | 'to') => {
        if (params?.date) {
            const selectedDate = new Date(params.date);
            const formattedDate = formatDate(selectedDate);

            if (type === 'from') {
                setFromDate(selectedDate);
                setShowFromPicker(false);  // Close "From" picker
                setTimeout(() => setShowToPicker(true), 300);  // Open "To" picker after delay
            } else {
                setToDate(selectedDate);
                setShowToPicker(false); // Close "To" picker
                onClose(); // Close the modal after selecting the second date
            }

            // Send selected date to parent
            onDateSelect(formattedDate, selectedDate, type);
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={STYLES.calendarModalContainer}>
                <View style={STYLES.CalendarContainer}>

                    {/* From Date Picker */}
                    {showFromPicker && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.PrimaryTextColor, marginBottom: 10 }}>Select From Date:</Text>
                            <DateTimePicker
                                calendarTextStyle={{ color: colors.PrimaryTextColor }}
                                headerTextStyle={{ color: colors.PrimaryTextColor }}
                                todayTextStyle={{ color: colors.AppPrimaryColor }}
                                weekDaysTextStyle={{ color: colors.PrimaryTextColor }}
                                mode="single"
                                initialView="day"
                                timePicker={true}
                                onChange={(params: any) => handleDateChange(params, 'from')}
                            />
                        </View>
                    )}

                    {/* To Date Picker (Opens After Selecting From Date) */}
                    {showToPicker && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ color: colors.PrimaryTextColor, marginBottom: 10 }}>Select To Date:</Text>
                            <DateTimePicker
                                calendarTextStyle={{ color: colors.PrimaryTextColor }}
                                headerTextStyle={{ color: colors.PrimaryTextColor }}
                                todayTextStyle={{ color: colors.AppPrimaryColor }}
                                weekDaysTextStyle={{ color: colors.PrimaryTextColor }}
                                mode="single"
                                initialView="day"
                                timePicker={true}
                                onChange={(params: any) => handleDateChange(params, 'to')}
                            />
                        </View>
                    )}

                    {/* Display selected dates */}
                    {fromDate && <Text style={{ color: colors.PrimaryTextColor }}>From Date: {formatDate(fromDate)}</Text>}
                    {toDate && <Text style={{ color: colors.PrimaryTextColor }}>To Date: {formatDate(toDate)}</Text>}

                </View>
            </View>
        </Modal>
    );
}
