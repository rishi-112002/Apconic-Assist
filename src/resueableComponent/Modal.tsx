import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { changeStatus, logoutUser } from "../redux/login/LoginReducer";
import DropdownComponent from "./CustomDropDown";
import colors from "../assest/color/colors";

const TopLeftModal = (props: { modalVisible: any, setModalVisible: any, value: any }) => {
    const [isFocus, setIsFocus , ] = useState(false);

    const { modalVisible, setModalVisible ,value } = props;
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
                        <DropdownComponent
                            value={value}
                            isFocus={isFocus}
                            setIsFocus={setIsFocus}
                        />
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
    container: {
        position: "absolute",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalView: {
        flex:1,
        position: "absolute",
        width:"35%",
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
        padding: 2,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 12,
        color:colors.redBase
    },
});

export default TopLeftModal;
