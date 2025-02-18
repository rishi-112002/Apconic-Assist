import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../assest/color/colors';
export const STYLES = StyleSheet.create({
  Splash_ringContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: 999,
    padding: hp(5),
    elevation: 5,
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
    fontWeight: '400',
    fontSize: 14,
    color: colors.PrimaryTextColor,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    borderBottomColor: colors.lightGray,
    borderWidth: 1,
    borderRightColor: colors.white,
    borderLeftColor: colors.white,
    borderTopColor: colors.white,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
    textAlign: 'center',
  },
  calendarModalContainer: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkerTransparent, // Darker transparent background
  },
  CalendarContainer: {
    padding: 20,
    backgroundColor: colors.BabyBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    color: colors.PrimaryTextColor,
  },
  cardContent: {
    flex: 9,
  },
  statusContainer: {
    width: '25%',
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
    color: colors.PrimaryTextColor,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
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
  mainContainer: {flex: 1, alignItems: 'center', backgroundColor: colors.white},
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  Logo: {width: 200, height: 200, resizeMode: 'center'},
  ContactLogo: {
    width: 100,
    height: 100,
    resizeMode: 'center',
    marginTop: -30,
  },
  markAttendanceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.greenBase,
    marginVertical: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 50,
  },
  simplifyStatusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greenBase,
    marginVertical: 10,
  },
  loginContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  subContainer: {flex: 1, alignItems: 'center'},
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

  microsoftButton: {
    flexDirection: 'row',
    gap: 15,
    backgroundColor: colors.BabyBlue,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    // flex: 1,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    // textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'black',
  },

  submitButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export const HomeSTYLES = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#ffff',
    elevation: 5,
    shadowOpacity: 5,
  },
  statusButton: {
    padding: 0,
    borderRadius: 2,
    backgroundColor: '#ddd',
  },
  selectedStatusButton: {
    backgroundColor: '#007bff',
  },
  statusText: {
    fontSize: 5,
    color: '#000',
  },
};
