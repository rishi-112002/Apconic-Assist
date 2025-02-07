/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Text,
  View,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackScreenName } from '../navigation/HomeNavigation';
import colors from '../assest/color/colors';
import { store } from '../redux/Store';
import { loginUser } from '../redux/login/LoginAction';


interface UserInfo {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  id: string;
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
  surname: string;
  userPrincipalName: string;
}

function MicrosoftSignIn() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [mobileModalVisible, setMobileModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation<NavigationProp<AuthStackScreenName>>();


  const saveUserToFirestore = async (user: UserInfo, mobilePhone: string) => {
    try {
      const userRef = firestore().collection('employees').doc(user.id);
      await userRef.set(
        {
          firstName: user.givenName,
          lastName: user.surname,
          email: user.mail,
          mobilePhone: mobilePhone,
          stausUpdatedAt: firestore.FieldValue.serverTimestamp(),
          status: "Unknown",
        },
        { merge: true }, // Ensures mobile number is updated if already exists
      );

      // console.log('User saved to Firestore:', user.displayName);
      navigation.navigate('HomeScreen'); // Navigate immediately
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      Alert.alert('Error', 'Failed to save user data.');
    }
  };

  const checkUserInFirestore = async (user: UserInfo) => {
    const userRef = firestore().collection('employees').doc(user.id);

    // Start checking user in Firestore without blocking UI
    userRef
      .get()
      .then(async docSnapshot => {
        if (docSnapshot.exists) {
          const existingUser = docSnapshot.data();

          if (existingUser?.mobilePhone) {
            console.log("existingUser?.email" , existingUser?.email)
            // console.log('User found, navigating immediately...');
           await store.dispatch(loginUser({userEmail: existingUser?.email}))
            navigation.navigate('HomeScreen'); // 🚀 Navigate instantly!
          } else {
            setUserInfo(user);
            setMobileModalVisible(true); // Show mobile number modal
          }
        } else {
          setUserInfo(user);
          setMobileModalVisible(true); // Show modal for new user
        }
      })
      .catch(error => {
        console.error('Firestore check failed:', error);
        Alert.alert('Error', 'Failed to check user data.');
      });
  };

  const onMicrosoftButtonPress = async () => {
    const provider = new auth.OAuthProvider('microsoft.com');
    provider.addScope('offline_access');
    provider.setCustomParameters({
      prompt: 'consent',
      tenant: 'cff49e6f-1c62-41ba-9576-57fae5162848',
    });

    try {
      const result = await auth().signInWithRedirect(provider);
      const userData = result?.additionalUserInfo?.profile as UserInfo;

      if (userData) {
        checkUserInFirestore(userData);
      }
    } catch (error) {
      console.error('Microsoft Sign-In Failed:', error);
      Alert.alert('Sign-In Failed', 'Something went wrong. Please try again.');
    }
  };

  const handleMobileSubmit = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Alert.alert('Invalid', 'Please enter a valid mobile number.');
      return;
    }
    if (userInfo) {
      setMobileModalVisible(false); // Close modal first
      saveUserToFirestore(userInfo, mobileNumber);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: colors.white }}>
      <View style={{ flex: 1, alignItems: 'center', gap: 100 }}>
        <View style={{ alignItems: 'center' }}>

          <Image source={require("../assest/icons/apconicLogo.png")} style={{ width: 200, height: 200, resizeMode: 'center' }} />
          <Image source={require("../assest/icons/apconicHubLogo.png")} style={{ width: 200, height: 200, resizeMode: 'center' }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.greenBase, marginVertical: 10 }}>
            Simplify Your Status
          </Text>
          <Text style={{
            fontSize: 15, fontWeight: 'bold', color: colors.greenBase, marginVertical: 10, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginHorizontal: 50
          }}>
            Mark Your Attendance & Stay Updated on Your Team's Status
          </Text>
        </View>
        <View style={{ alignItems: 'center', gap: 20 }}>
          <Text style={{ color: colors.gray }}>
            Sign in with your Apconic account to get started
          </Text>
          <TouchableOpacity onPress={onMicrosoftButtonPress} style={{ flexDirection: 'row', gap: 15, backgroundColor: colors.BabyBlue, padding: 10, borderRadius: 5 }}>
            <Image source={require("../assest/icons/microsoft.png")} />
            <Text>Microsoft Sign-In</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        mobileModalVisible &&
        <Modal transparent visible={mobileModalVisible} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.container}>
              <Text style={styles.title}>Primary Mobile Number Required</Text>
              <Text style={styles.message}>
                Please enter your mobile number to continue.
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleMobileSubmit}
                  style={[styles.button, styles.submitButton]}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
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
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MicrosoftSignIn;
