import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import { AuthStackScreenName } from "../navigation/HomeNavigation";
import { loginUser } from "../redux/login/LoginAction";
import { store } from "../redux/Store";
import { UserInfo } from "../assest/constants/InterfaceConstants";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


function LoginScreenEffect() {
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
  return{
    onMicrosoftButtonPress ,mobileModalVisible 
  }

}
export default LoginScreenEffect;