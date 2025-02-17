/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import colors from '../assest/color/colors';
import LoginScreenEffect from '../functions/LoginScreenUseEffect';
import StringConstants from '../assest/constants/StringsConstants';
import { STYLES } from '../styles/ScreenStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useState } from 'react';

type RouteParams = {
  params: {
    user: any; // Adjust the type as needed
  };
};

function MobileNumber() {
  const route = useRoute<RouteProp<RouteParams>>();
  const userInfo = route.params?.user;
  const { handleMobileSubmit, mobileNumber, setMobileNumber } =
    LoginScreenEffect();

  const [borderColor, setBorderColor] = useState<string | undefined>(undefined);

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
            flexDirection: 'row', justifyContent:
              'center', gap: 20, alignItems: 'center'
          }}>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.darkblack,
            }}>
            Primary Mobile Number :
          </Text>
          <TextInput
            style={{
              width: '50%',
              padding: 10,
              borderBottomWidth: 0.5,
              borderColor: borderColor,
              borderRadius: 5,
              marginBottom: 15,
              textAlign: 'center',
            }}
            onFocus={() => setBorderColor(colors.greenlight)}
            onBlur={() => setBorderColor(colors.gray)}
            keyboardType="numeric"
            maxLength={10}
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleMobileSubmit(userInfo)}
          style={{ backgroundColor: mobileNumber.length === 10 ? colors.greenSoftneer : colors.SoftGray, borderRadius: 100, padding: 10, alignSelf: 'flex-end', margin: 20 }}>
          <Image source={require("../assest/icons/forwardArrow.png")} style={{ resizeMode: 'center', width: 25, height: 25, tintColor: mobileNumber.length === 10 ? colors.greenDarkest : colors.gray }} />
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </GestureHandlerRootView>
  );
}

export default MobileNumber;
