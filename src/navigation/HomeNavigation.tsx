import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import MicrosoftSignIn from "../screen/microsoftAuth";
import HomeScreen from "../screen/HomeScreen";

type AuthStackScreenName = {
    HomeScreen: undefined// Ensuring HomeScreen gets userInfo
    LoginScreen: undefined;
};

const Stack = createStackNavigator<AuthStackScreenName>();

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={MicrosoftSignIn}
            // options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            // options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;
