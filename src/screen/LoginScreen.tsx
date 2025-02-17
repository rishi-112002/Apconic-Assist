import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../assest/color/colors';
import LoginScreenEffect from '../functions/LoginScreenUseEffect';
import StringConstants from '../assest/constants/StringsConstants';
import { STYLES } from '../styles/ScreenStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
function LoginScreen() {
  const {
    onMicrosoftButtonPress,
  } = LoginScreenEffect();

  const { MICROSOFT_SIGNIN, MARK_YOUR_ATTENDANCE, SIGN_IN_WITH_APCONIC_ACCOUNT } = StringConstants();

  return (
    <GestureHandlerRootView style={STYLES.mainContainer}>
      <View style={[STYLES.subContainer, { gap: 150 }]}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assest/icons/apconicLogo.png')} style={STYLES.Logo} />
          <Image source={require('../assest/icons/apconicHubLogo.png')} style={STYLES.Logo} />
          <Text style={STYLES.markAttendanceText}>{MARK_YOUR_ATTENDANCE}</Text>
        </View>
        <View style={[STYLES.subContainer, { gap: 20 }]}>
          <Text style={{ color: colors.gray }}>{SIGN_IN_WITH_APCONIC_ACCOUNT}</Text>
          <TouchableOpacity onPress={onMicrosoftButtonPress} style={STYLES.microsoftButton}>
            <Image source={require('../assest/icons/microsoft.png')} />
            <Text style={{ alignSelf:'center'}}>{MICROSOFT_SIGNIN}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default LoginScreen;