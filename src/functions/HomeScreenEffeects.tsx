import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useLayoutEffect } from "react";
import { Linking, Text, TouchableOpacity, Image, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../assest/color/colors";
import { loginUser } from "../redux/login/LoginAction";
import { RootState, store } from "../redux/Store";
import UserBadge from "../resueableComponent/UserBadge";
import { STYLES } from "../styles/ScreenStyles";
import firestore from "@react-native-firebase/firestore";
import { AuthStackScreenName } from "../navigation/HomeNavigation";

function HomeScreenEffect() {
    const [employees, setEmployees] = useState<{ id: string; firstName: string; lastName: string; email: string; mobilePhone: string; stausUpdatedAt: any; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const navigation = useNavigation<NavigationProp<AuthStackScreenName>>();

    const userEmail = useSelector(
        (state: RootState) => state.authentication.userEmail,
    );
    const userId = useSelector(
        (state: RootState) => state.authentication.employeeId,
    );
    const userName = useSelector(
        (state: RootState) => state.authentication.name,
    );
    const status = useSelector(
        (state: RootState) => state.authentication.status,
    );

    const makeCall = (number: any) => {
        const url = `tel:${number}`;
        Linking.openURL(url).catch(err => console.error("Failed to open dialer", err));
    };
    useEffect(() => {
        if (userEmail) {
            store.dispatch(loginUser({ userEmail: userEmail }));
        }
        else {
            navigation.navigate("LoginScreen")
        }
    }, [userEmail, userName, userId, status]);
    useEffect(() => {

        const unsubscribe = firestore()
            .collection("employees")
            .onSnapshot((querySnapshot: any) => {
                const employeeList: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    mobilePhone: string;
                    stausUpdatedAt: any;
                }[] = [];

                querySnapshot.forEach((doc: any) => {
                    const employeeData = { id: doc.id, ...doc.data() };
                    if (employeeData.email !== userEmail) { // Exclude logged-in user
                        console.log("employeeData", employeeData);
                        employeeList.push(employeeData);
                    }
                });

                setEmployees(employeeList);
                setLoading(false);
            });

        // console.log("userName", userEmail);

        return () => unsubscribe();
    }, [userEmail, status]);

    const [modalVisible, setModalVisible] = useState(false);

    // const [statusValue, setStatusValue] = useState();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Employees</Text>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 15 }}
                >
                    <Image source={require("../assest/icons/meu.png")} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 15, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        height: 20,
                        backgroundColor: status === "Present" ? "green" : status === "On-leave" ? "red" : status === "Unknown" ? "white" : "orange", paddingHorizontal: 5, borderRadius: 5
                    }}>
                        <Text style={[STYLES.value, { color: status !== "Unknown" ? colors.white : colors.gray, fontSize: 12 }]}>
                            {status}
                        </Text>
                    </View>
                    <UserBadge userName={userName} status={status} onPress={() => setModalVisible(true)} />
                </View>
            ),
        });
    }, [navigation, status]);
    return {
        modalVisible, setModalVisible,
        navigation, makeCall,
        employees, setEmployees,
        loading, setLoading,
        isFocus, setIsFocus,
        status,
    }
}
export default HomeScreenEffect;