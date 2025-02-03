import { Button, Text, View  ,TextInput  , Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
interface UserInfo {
    "@odata.context": string;
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
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [isMobileRequired, setIsMobileRequired] = useState<boolean>(false);
    const navigation = useNavigation();
    // const checkOrAddUserInFirestore = async userDetails => {
    //     try {
    //         const userCollection = firestore().collection('employee');
    //         const querySnapshot = await userCollection
    //             .where('email', '==', userInfo.mail )
    //             .get();
    //         if (!querySnapshot.empty) {
    //             const userDoc = querySnapshot.docs[0];
    //             console.log('User exists in Firestore:', userDoc.data());
    //             Alert.alert('User Found', `Welcome back, ${userDoc.data().displayName}`);
    //         } else {
    //             const newUser = {
    //                email : userInfo.mail || null,
    //                phoneNumber : userInfo.mobilePhone || null,
    //             };
    //             await userCollection.add(newUser);
    //             console.log('New user added to Firestore:', newUser);
    //             Alert.alert('New User Added', `Welcome, ${newUser.displayName}`);
    //         }
    //     } catch (error) {
    //         console.error('Error checking or adding user in Firestore:', error);
    //         Alert.alert('Error', 'Failed to check or add user in Firestore.');
    //     }
    // };
    const saveUserToFirestore = async (user: UserInfo, mobilePhone?: string) => {
        try {
            const userRef = firestore().collection('employees').doc(user.id);
            const docSnapshot = await userRef.get();

            if (!docSnapshot.exists) {
                await userRef.set({
                    firstName: user.givenName,
                    lastName: user.surname,
                    email: user.mail,
                    mobilePhone: mobilePhone || user.mobilePhone, // Use entered mobile if missing
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    status: null
                });

                console.log("User saved to Firestore:", user.givenName);
                Alert.alert("Success", "User data saved successfully!");

                setIsMobileRequired(false); // Hide input field
                setUserInfo(null); // Reset user state
                navigation.navigate('HomeScreen'); // Navigate to HomeScreen
                
            } else {
                console.log("User already exists in Firestore.");
                Alert.alert("User Exists", "User data already exists in Firestore.");
            }
        } catch (error) {
            console.error("Error saving user to Firestore:", error);
            Alert.alert("Error", "Failed to save user data.");
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
        await auth().signInWithRedirect(provider).then((result: any) => {
            console.log('result', result);
            setUserInfo(result.additionalUserInfo.profile);
            // saveUserToFirestore(result.additionalUserInfo.profile);

            if (!userInfo.mobilePhone) {
                setIsMobileRequired(true); // Show input field if mobile number is missing
            } else {
                saveUserToFirestore(result.additionalUserInfo.profile);
            }
        })
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button
                title="Microsoft Sign-In"
                onPress={() => onMicrosoftButtonPress()}
            />
            {userInfo && isMobileRequired && (
                <View style={{ marginTop: 20 }}>
                    <Text>Please enter your mobile number:</Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "gray",
                            padding: 10,
                            marginTop: 10,
                            width: 200,
                            borderRadius: 5
                        }}
                        placeholder="Enter Mobile Number"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                    />
                    <Button
                        title="Save Mobile & Proceed"
                        onPress={() => {
                            if (mobileNumber.length < 10) {
                                Alert.alert("Invalid", "Please enter a valid mobile number.");
                            } else {
                                saveUserToFirestore(userInfo, mobileNumber);
                            }
                        }}
                    />
                </View>
            )}
        </View>
    );
}
export default MicrosoftSignIn;