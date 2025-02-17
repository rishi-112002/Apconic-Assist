import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { RootState, store } from '../redux/Store';
import colors from '../assest/color/colors';
import { updateStatus } from '../redux/login/LoginAction';
import { statusOptions } from '../assest/constants/InterfaceConstants';



function DropdownComponent(props: { setCalendarVisible: any, value: any, isFocus: any, setIsFocus: any }) {
    const { value, isFocus, setIsFocus, setCalendarVisible } = props;
    const employeeId = useSelector(
        (state: RootState) => state.authentication.employeeId,
    );
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Present':
                return { backgroundColor: colors.greenSoftneer, color: colors.greenDarkest };
            case 'Outside':
                return { backgroundColor: colors.softOrange, color: "orange" };
            case 'On-leave':
                return { backgroundColor: colors.redSoftner, color: colors.redDarkest };
            default:
                return {};
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
                    if (item.value !== "On-leave") {
                        store.dispatch(updateStatus({ status: value, employeeId: employeeId, newStatus: item.value, tovalue: "", FromValue: "" }));
                    }
                    else {

                        setCalendarVisible(true)
                    }
                }
                }
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
