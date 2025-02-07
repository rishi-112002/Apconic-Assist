import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { changeStatus, logoutUser } from "../redux/login/LoginReducer";
import DropdownComponent from "./CustomDropDown";

const TopLeftModal = (props: { modalVisible: any, setModalVisible: any }) => {
    const { modalVisible, setModalVisible } = props;
    // const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        setModalVisible(false);
    };

    const handleChangeStatus = () => {
        dispatch(changeStatus("Active")); // Example status change
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        {/* Logout Option */}
                        <TouchableOpacity onPress={handleLogout} style={styles.option}>
                            <Text style={styles.optionText}>Logout</Text>
                        </TouchableOpacity>

                        {/* Change Status Option */}
                        <DropdownComponent
                            value={undefined}
                            isFocus={undefined}
                            setIsFocus={undefined}
                             />

                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalView: {
        position: "absolute",
        top: 50,
        right: 10, // Ensures it appears at the extreme left
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        alignSelf: "flex-start", // Prevents shifting to the center
        marginLeft: 10, // Optional spacing from the left edge
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
    },
});

export default TopLeftModal;
