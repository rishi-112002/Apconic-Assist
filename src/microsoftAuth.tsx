import {Alert, Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
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
  const checkOrAddUserInFirestore = async UserInfo => {
    try {
      const userCollection = firestore().collection('users');
      const querySnapshot = await userCollection
        .where('email', '==', userDetails.mail || userDetails.userPrincipalName)
        .get();

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        console.log('User exists in Firestore:', userDoc.data());
        Alert.alert(
          'User Found',
          `Welcome back, ${userDoc.data().displayName}`,
        );
      } else {
        const newUser = {
          displayName: userDetails.displayName,
          givenName: userDetails.givenName,
          surname: userDetails.surname,
          email: userDetails.mail || userDetails.userPrincipalName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        await userCollection.add(newUser);
        console.log('New user added to Firestore:', newUser);
        Alert.alert('New User Added', `Welcome, ${newUser.displayName}`);
      }
    } catch (error) {
      console.error('Error checking or adding user in Firestore:', error);
      Alert.alert('Error', 'Failed to check or add user in Firestore.');
    }
  };

  const fetchUserDetails = async () => {
    try {
      const accessToken =
        userInfo?.accessToken || (await getToken('accessToken'));

      if (!accessToken) {
        Alert.alert('Error', 'No access token found. Please log in again.');
        return;
      }

      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(prevInfo => ({
          ...prevInfo,
          userDetails: data,
        }));
        console.log('User Info:', data);
        await checkOrAddUserInFirestore(data);
      } else if (!userInfo?.accessToken) {
        Alert.alert('Error', 'Access token expired. Refreshing...');
        await refreshAccessToken();
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch user details:', errorData);
        Alert.alert(
          'Error',
          errorData.error?.message || 'Failed to fetch user details.',
        );
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred while fetching user details.',
      );
    }
  };
  const onMicrosoftButtonPress = async () => {
    // console.log('Microsoft Sign-In Button Pressed');
    // Generate the provider object
    const provider = new auth.OAuthProvider('microsoft.com');
    // Optionally add scopes
    provider.addScope('offline_access');
    // Optionally add custom parameters
    provider.setCustomParameters({
      prompt: 'consent',
      tenant: 'cff49e6f-1c62-41ba-9576-57fae5162848',
    });

    // Sign-in the user with the provider
    await auth()
      .signInWithRedirect(provider)
      .then((result: any) => {
        console.log('result', result);
        setUserInfo(result.additionalUserInfo.profile);
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Microsoft Sign-In"
        onPress={() => onMicrosoftButtonPress()}
      />
      {userInfo && (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black'}}>Name : {userInfo.displayName}</Text>
          <Text>unique id : {userInfo.id}</Text>
          <Text> email : {userInfo.mail}</Text>
          <Text>Job Title: {userInfo.jobTitle ?? 'Not Available'}</Text>
          <Text>
            {' '}
            Office location : {userInfo.officeLocation ?? 'Not Available'}
          </Text>
        </View>
      )}
    </View>
  );
}
export default MicrosoftSignIn;
