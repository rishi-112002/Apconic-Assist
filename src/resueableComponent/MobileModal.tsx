import { Modal, TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity } from "react-native";
import { STYLES } from "../styles/ScreenStyles";

function MobileModal(props: { mobileModalVisible: any, mobileNumber: any, setMobileNumber: any, handleMobileSubmit: any }) {
    const { handleMobileSubmit, mobileModalVisible, mobileNumber, setMobileNumber } = props
    return (
        <Modal transparent visible={mobileModalVisible} animationType="fade">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={STYLES.modalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={STYLES.modalContainer}>
                        <View style={STYLES.modalContent}>
                            <Text style={STYLES.modalTitle}>Primary Mobile Number Required</Text>
                            <Text style={STYLES.modalMessage}>Please enter your mobile number to continue.</Text>

                            <TextInput
                                style={STYLES.input}
                                placeholder="Enter mobile number"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />

                            <View style={STYLES.buttonContainer}>
                                <TouchableOpacity
                                    onPress={handleMobileSubmit}
                                    style={[STYLES.button, STYLES.submitButton]}>
                                    <Text style={STYLES.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
export default MobileModal;