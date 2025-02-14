/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import colors from '../assest/color/colors';
import LoginScreenEffect from '../functions/LoginScreenUseEffect';
import StringConstants from '../assest/constants/StringsConstants';
import {STYLES} from '../styles/ScreenStyles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

function MobileNumber() {
  const route = useRoute();
  const userInfo = route.params?.user;
  const {handleMobileSubmit, mobileNumber, setMobileNumber} =
    LoginScreenEffect();

  const {MobileNumberText, SubmitText} = StringConstants();

  return (
    <GestureHandlerRootView style={STYLES.mainContainer}>
      <Image
        source={require('../assest/icons/apconicLogo.png')}
        style={STYLES.Logo}
      />
      <Image
        source={require('../assest/icons/apconicHubLogo.png')}
        style={STYLES.Logo}
      />
      <View style={STYLES.modalContainer}>
        <View
          style={{
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.black,
              marginBottom: 10,
            }}>
            {MobileNumberText}
          </Text>
        </View>
        <TextInput
          style={STYLES.input}
          keyboardType="numeric"
          maxLength={10}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <View style={STYLES.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleMobileSubmit(userInfo)} // Pass userInfo
            style={[STYLES.button, STYLES.submitButton]}>
            <Text style={STYLES.buttonText}>{SubmitText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default MobileNumber;
