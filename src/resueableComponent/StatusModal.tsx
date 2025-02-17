import { Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { STYLES } from "../styles/ScreenStyles";
import DropdownComponent from "./CustomDropDown";

function StatusModal(props: { modalVisible: any, setCalendarVisible: any, value: any, isFocus: any, setIsFocus: any }) {
    const { modalVisible, isFocus, setCalendarVisible, setIsFocus, value } = props
    return (
        <View>
            <Modal transparent visible={modalVisible} animationType="fade">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={STYLES.modalOverlay}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={STYLES.modalContainer}>
                            <View style={STYLES.modalContent}>
                                <Text style={STYLES.modalTitle}>selecte Status </Text>
                                <DropdownComponent setCalendarVisible={setCalendarVisible} value={value} isFocus={isFocus} setIsFocus={setIsFocus} />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )

}
export default StatusModal;