import {createStackNavigator} from '@react-navigation/stack';
import MicrosoftSignIn from '../screen/microsoftAuth';
import HomeScreen from '../screen/HomeScreen';
import SplashScreen from '../screen/SplashScreen';

export type AuthStackScreenName = {
  HomeScreen: undefined; // Ensuring HomeScreen gets userInfo
  LoginScreen: undefined;
  SplashScreen: undefined;
};

const Stack = createStackNavigator<AuthStackScreenName>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
       <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={MicrosoftSignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerStyle: {
            elevation: 0, // Removes shadow for Android
            shadowOpacity: 0, // Removes shadow for iOS
          },
        }}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
