import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../assest/color/colors';
import LoginScreenEffect from '../functions/LoginScreenUseEffect';
import StringConstants from '../assest/constants/StringsConstants';
import { STYLES } from '../styles/ScreenStyles';
function LoginScreen() {
  const { onMicrosoftButtonPress, mobileModalVisible } = LoginScreenEffect()
  const { MICROSOFT_SIGNIN, MARK_YOUR_ATTENDANCE, SIGN_IN_WITH_APCONIC_ACCOUNT } = StringConstants()
  return (
    <View style={STYLES.mainContainer}>
      <View style={[STYLES.subContainer, { gap: 100 }]}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require("../assest/icons/apconicLogo.png")} style={STYLES.Logo} />
          <Image source={require("../assest/icons/apconicHubLogo.png")} style={STYLES.Logo} /> 
          <Text style={STYLES.markAttendanceText}>
            {MARK_YOUR_ATTENDANCE}
          </Text>
        </View>
        <View style={[STYLES.subContainer, { gap: 20 }]}>
          <Text style={{ color: colors.gray }}>
            {SIGN_IN_WITH_APCONIC_ACCOUNT}
          </Text>
          <TouchableOpacity onPress={onMicrosoftButtonPress} style={STYLES.microsoftButton}>
            <Image source={require("../assest/icons/microsoft.png")} />
            <Text>{MICROSOFT_SIGNIN}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        mobileModalVisible &&
        <Modal transparent visible={mobileModalVisible} animationType="fade">
          <View style={STYLES.overlay}>
            <View style={STYLES.container}>
              <Text style={STYLES.title}>Primary Mobile Number Required</Text>
              <Text style={STYLES.message}>
                Please enter your mobile number to continue.
              </Text>
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
          </View>
        </Modal>
      }
    </View>
  );
}


export default LoginScreen;
