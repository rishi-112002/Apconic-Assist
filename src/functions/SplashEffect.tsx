/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootState, store } from '../redux/Store';
import { AuthStackScreenName } from '../navigation/HomeNavigation';
import { CheckUserlogin } from '../redux/login/LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
function SplashEffect() {
    const userName = useSelector(
        (state: RootState) => state.authentication.name,
    );
    const name = AsyncStorage.getItem("name");
    console.log("name", name)
    const userEmail = useSelector(
        (state: RootState) => state.authentication.userEmail,
    );
    const initializeApp = async () => {
        console.log("hello")
        store.dispatch(CheckUserlogin()); // Dispatch action to check user login
    };
    useEffect(() => {
        initializeApp();
    }, [initializeApp]);
    // console.log("userName", userName);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    const ring1Scale = useSharedValue(0);
    const ring2Scale = useSharedValue(0);
    const logoOpacity = useSharedValue(0);
    const navigation = useNavigation<NavigationProp<AuthStackScreenName>>();
    useEffect(() => {
        if (isFirstLaunch) {
            // Animate ring 1
            setTimeout(() => {
                ring1Scale.value = withTiming(1.2, {
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                });
            }, 150);

            // Animate ring 2 and logo
            setTimeout(() => {
                ring2Scale.value = withTiming(1.5, {
                    duration: 1000,
                    easing: Easing.out(Easing.exp),
                });
                logoOpacity.value = withTiming(1, { duration: 500 });
            }, 400);

            // Handle navigation logic and connectivity
            const splashTimeout = setTimeout(async () => {
                if (userEmail) {
                    // console.log("userEmail in splash ", userEmail , userName);
                    navigation.navigate('HomeScreen');
                }
                else {
                    navigation.navigate('LoginScreen');
                }

                setIsFirstLaunch(false);
            }, 2000);


            // Cleanup timeout on unmount
            return () => clearTimeout(splashTimeout);
        }
    }, [
        userName,
        navigation,
        userEmail
    ]);

    const ring1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }],
    }));
    const ring2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring2Scale.value }],
    }));
    const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));

    return isFirstLaunch
        ? { ring1Style, ring2Style, logoStyle }
        : { ring1Style: {}, ring2Style: {}, logoStyle: {} };
}
export default SplashEffect;
