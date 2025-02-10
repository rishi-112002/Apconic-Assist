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
  },
  value: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.PrimaryTextColor
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.offWhite,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 9,
  },
  statusContainer: {
    width: "25%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
    color: colors.PrimaryTextColor,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  callButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  callButton: {
    margin: 15,
    width: 30,
    height: 30,
    backgroundColor: colors.SoftGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  callIcon: {
    width: 20,
    height: 20,
    resizeMode: 'center',
    tintColor: colors.greenDarkest,
  },
  mainContainer: { flex: 1, alignItems: 'center', backgroundColor: colors.white },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  Logo: { width: 200, height: 200, resizeMode: 'center' },
  markAttendanceText: {
    fontSize: 15, fontWeight: 'bold', color: colors.greenBase, marginVertical: 10, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 50
  },
  simplifyStatusText: { fontSize: 20, fontWeight: 'bold', color: colors.greenBase, marginVertical: 10 },
  loginContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  subContainer: { flex: 1, alignItems: 'center' }
  ,
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  microsoftButton:
    { flexDirection: 'row', gap: 15, backgroundColor: colors.BabyBlue, padding: 10, borderRadius: 5 },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },

  submitButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color:colors.white,
    fontWeight: 'bold',
  },
});