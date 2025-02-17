import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';
import {AuthStackScreenName} from '../navigation/HomeNavigation';
import {loginUser} from '../redux/login/LoginAction';
import {store} from '../redux/Store';
import {UserInfo} from '../assest/constants/InterfaceConstants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
 
function LoginScreenEffect() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [mobileModalVisible, setMobileModalVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation<NavigationProp<AuthStackScreenName>>();
 
  // Fetch and store FCM Token
  const getFCMToken = async (userId: string) => {
    try {
      const token = await messaging().getToken();
      if (token) {
        await firestore()
          .collection('employees')
          .doc(userId)
          .set({fcmToken: token}, {merge: true});
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };
 
  // Save user to Firestore and navigate to HomeScreen
  const saveUserToFirestore = async (user: UserInfo, mobilePhone: string) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'User authentication failed.');
        return;
      }
 
      const userRef = firestore().collection('employees').doc(user.id);
      await getFCMToken(user.id);
 
      await userRef.set(
        {
          firstName: user.givenName,
          lastName: user.surname,
          email: user.mail,
          mobilePhone: mobilePhone,
          statusUpdatedAt: firestore.FieldValue.serverTimestamp(),
          status: 'Present',
          UID: currentUser.uid,
        },
        {merge: true},
      );
      setMobileModalVisible(false);
      if (user.mail) {
        await store.dispatch(loginUser({userEmail: user.mail}));
      } else {
        console.error('User email is null');
        Alert.alert('Error', 'User email is null.');
      }
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      Alert.alert('Error', 'Failed to save user data.');
    }
  };
 
  // Check if user exists in Firestore
  const checkUserInFirestore = async (user: UserInfo) => {
    try {
      const userRef = firestore().collection('employees').doc(user.id);
      const docSnapshot = await userRef.get();
 
      if (docSnapshot.exists) {
        const existingUser = docSnapshot.data();
        if (existingUser?.mobilePhone) {
          await store.dispatch(loginUser({userEmail: existingUser.email}));
          navigation.navigate('HomeScreen');
        } else {
          setUserInfo(user);
          setMobileModalVisible(true);
        }
      } else {
        setUserInfo(user);
        setMobileModalVisible(true);
      }
    } catch (error) {
      console.error('Firestore check failed:', error);
      Alert.alert('Error', 'Failed to check user data.');
    }
  };
 
  // Microsoft authentication handler
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
 
  // Handle mobile number submission
  const handleMobileSubmit = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      Alert.alert('Invalid', 'Please enter a valid mobile number.');
      return;
    }
 
    if (userInfo) {
      await saveUserToFirestore(userInfo, mobileNumber);
    }
  };
 
  return {
    onMicrosoftButtonPress,
    handleMobileSubmit,
    mobileNumber,
    setMobileNumber,
    mobileModalVisible,
  };
}
 
export default LoginScreenEffect;