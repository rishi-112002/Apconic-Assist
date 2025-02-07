import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import firestore from "@react-native-firebase/firestore";
import { useSelector } from 'react-redux';
import { RootState, store } from '../redux/Store';
import { changeStatus } from '../redux/login/LoginReducer';

const statusOptions = [
    { label: 'Present', value: 'Present' },
    { label: 'On-leave', value: 'On-leave' },
    { label: 'Outside', value: 'Outside' },
    { label: 'Unknown', value: 'Unknown' },
];

function DropdownComponent(props: { value: any, isFocus: any, setIsFocus: any }) {
    const { value, isFocus, setIsFocus } = props;
      const userEmail = useSelector(
        (state: RootState) => state.authentication.userEmail,
      );
      const employeeId = useSelector(
        (state: RootState) => state.authentication.employeeId,
      );
    // console.log('employeeId in drop down', value);
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Present':
                return { backgroundColor: 'green', color: 'white' };
            case 'Outside':
                return { backgroundColor: 'orange', color: 'white' };
            case 'On-leave':
                return { backgroundColor: 'red', color: 'white' };
            case 'Unknown':
                return { backgroundColor: 'white', color: 'gray' };
            default:
                return {};
        }
    };
    const dispatch = store.dispatch;
    // console.log('employeeId in drop down', employeeId, email);
    const updateStatus = async (newStatus: any) => {
        try {
            await firestore().collection("employees").doc(employeeId).update({
                status: newStatus,
                stausUpdatedAt: firestore.FieldValue.serverTimestamp(),
            });
            await firestore().collection("employees").doc(employeeId).collection("statusLog").add({
                status: newStatus,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            })
            dispatch(changeStatus(newStatus));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    return (
        <View style={styles.container}>
            <Dropdown
                style={[
                    styles.dropdown,
                    isFocus && { borderColor: 'blue' },
                    getStatusStyle(value),
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                    styles.selectedTextStyle,
                    { color: getStatusStyle(value).color },  // Dynamic text color
                ]}
                iconStyle={styles.iconStyle}
                itemTextStyle={{ fontSize: 12 }}
                data={statusOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select status' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    updateStatus(item.value);
                    setIsFocus(false);
                }}

            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 2,
    },
    dropdown: {
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,

    },

    placeholderStyle: {
        fontSize: 10,
    },
    selectedTextStyle: {
        fontSize: 11,

        fontWeight: '500',
    },
    iconStyle: {
        width: 20,
        height: 20,
        color: "transparent"
    },
});
