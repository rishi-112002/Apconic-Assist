import { Button, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
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
        })
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button
                title="Microsoft Sign-In"
                onPress={() => onMicrosoftButtonPress()}
            />
            {
                userInfo && (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "black" }}>Name : {userInfo.displayName}</Text>
                        <Text>
                            unique id : {userInfo.id}
                        </Text>
                        <Text> email : {userInfo.mail}</Text>
                        <Text>Job Title: {userInfo.jobTitle ?? "Not Available"}</Text>
                        <Text> Office location : {userInfo.officeLocation ?? "Not Available"}</Text>
                    </View>
                )
            }
        </View>
    );
}
export default MicrosoftSignIn;