import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DropdownComponent from "./CustomDropDown";
import colors from "../assest/color/colors";
import { store } from "../redux/Store";
import { LogOutUser } from "../redux/login/LoginAction";

const TopLeftModal = (props: { setCalendarVisible: any, modalVisible: any, setModalVisible: any, value: any, tovalue: any, FromValue: any }) => {
    const [isFocus, setIsFocus] = useState(false);
    const { modalVisible, setModalVisible, value, setCalendarVisible, tovalue, FromValue } = props;
    const handleLogout = () => {
        store.dispatch(LogOutUser());
        setModalVisible(false);
    };
    return (
        <View >

            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        {/* Logout Option */}
                        <DropdownComponent
                            setCalendarVisible={setCalendarVisible}
                            value={value}
                            isFocus={isFocus}
                            setIsFocus={setIsFocus}
                            tovalue={tovalue}
                            FromValue={FromValue} />
                        <TouchableOpacity onPress={handleLogout} style={styles.option}>
                            <Text style={styles.optionText}>Logout</Text>
                        </TouchableOpacity>

                        {/* Change Status Option */}

                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalView: {
        flex: 1,
        position: "absolute",
        top: 50,
        right: 10, // Ensures it appears at the extreme left
        backgroundColor: "white",
        padding: 10,
        width: "40%",
        gap: 10,
        borderRadius: 5,
        elevation: 5,

    },
    option: {
        paddingHorizontal: 5,
    },
    optionText: {
        fontSize: 12,
        color: colors.redBase
    },
});

export default TopLeftModal;
