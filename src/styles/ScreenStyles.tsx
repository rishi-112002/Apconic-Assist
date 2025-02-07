import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../assest/color/colors";
export const STYLES = StyleSheet.create({
    Splash_ringContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 999,
    padding: hp(5),
    elevation:5
  },
  Splash_logo: {
    width: hp(25),
    height: hp(25),
    borderRadius: hp(15),
    resizeMode: 'center',
  },
  Splash_container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0EFEA ',
  },});