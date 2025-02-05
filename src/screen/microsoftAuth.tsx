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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  const saveUserToFirestore = async (user: UserInfo, mobilePhone: string) => {
    try {
      const userRef = firestore().collection('employees').doc(user.id);
      await userRef.set(
        {
          firstName: user.givenName,
          lastName: user.surname,
          email: user.mail,
          mobilePhone: mobilePhone,
          createdAt: firestore.FieldValue.serverTimestamp(),
          status: null,
        },
        {merge: true}, // Ensures mobile number is updated if already exists
      );

      console.log('User saved to Firestore:', user.displayName);
      navigation.replace('HomeScreen'); // Navigate immediately
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
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const existingUser = docSnapshot.data();

          if (existingUser?.mobilePhone) {
            console.log('User found, navigating immediately...');
            navigation.replace('HomeScreen');
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Microsoft Sign-In" onPress={onMicrosoftButtonPress} />

      {/* {userInfo && (
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Text style={{color: 'black'}}>Name: {userInfo.displayName}</Text>
          <Text>Unique ID: {userInfo.id}</Text>
          <Text>Email: {userInfo.mail}</Text>
          <Text>Mobile Phone: {userInfo.mobilePhone ?? 'Not Available'}</Text>
          <Text>Job Title: {userInfo.jobTitle ?? 'Not Available'}</Text>
          <Text>Office Location: {userInfo.officeLocation ?? 'Not Available'}</Text>
        </View>
      )} */}

      {/* Mobile Number Input Modal */}
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
              {/* <TouchableOpacity
                onPress={() => setMobileModalVisible(false)}
                style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={handleMobileSubmit}
                style={[styles.button, styles.submitButton]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
