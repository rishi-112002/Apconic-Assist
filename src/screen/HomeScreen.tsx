import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { loginUser } from "../redux/login/LoginAction";
import { RootState, store } from "../redux/Store";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import colors from "../assest/color/colors";
import UserBadge from "../resueableComponent/UserBadge";
import DropdownComponent from "../resueableComponent/CustomDropDown";
import TopLeftModal from "../resueableComponent/Modal";
function HomeScreen() {
  const [employees, setEmployees] = useState<{ id: string; firstName: string; lastName: string; email: string; mobilePhone: string; stausUpdatedAt: any; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
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
  const navigation = useNavigation();
  useEffect(() => {
    if (userEmail) {
      store.dispatch(loginUser({ userEmail: userEmail }));
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
            <Text style={[styles.value, { color: status !== "Unknown" ? colors.white : colors.gray, fontSize: 12 }]}>
              {status}
            </Text>
          </View>
          <UserBadge userName={userName} status={status} onPress={() => setModalVisible(true)} />
        </View>
      ),
    });
  }, [navigation, status]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <View style={styles.container}>
      <TopLeftModal modalVisible={modalVisible} setModalVisible={setModalVisible} value={status} />

      <FlatList
        data={employees}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View style={{ flex: 9 }}>
              <View style={{ width: "25%", justifyContent: 'center', alignItems: 'center', backgroundColor: item.status === "Present" ? "green" : item.status === "On-leave" ? "red" : "orange", paddingHorizontal: 5, borderRadius: 5 }}>
                <Text style={[styles.value, { color: item.status !== "Unknown" ? colors.white : colors.gray, fontSize: 12 }]}>
                  {item.status}
                </Text>
              </View>
              <Text style={[styles.title, { flex: 0.5 }]}>{item.firstName} {item.lastName}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.value}>{item.email}</Text>
                  {item.status !== "Present" && (
                    <Text style={styles.label}>
                      {item.status === "On-leave" ? "On Leave From" : item.status === "Outside" ? "Outside From" : "Status Updated At"}:
                      <Text style={styles.value}>{new Date(item?.stausUpdatedAt?.toDate()).toLocaleString()}</Text>
                    </Text>
                  )}
                </View>
              </View>

            </View>
            <View style={{ flex: 2 }}>
              <TouchableOpacity onPress={() => makeCall(item.mobilePhone)} style={{ margin: 15, width: 30, height: 30, backgroundColor: colors.SoftGray, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }} >
                <Image source={require("../assest/icons/phone_icon_white.png")} style={{ width: 20, height: 20, resizeMode: 'center', tintColor: colors.greenDarkest }} />
              </TouchableOpacity>
            </View>
          </View>
        )
        } />
    </View >
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
    color: colors.PrimaryTextColor
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.PrimaryTextColor
  },
});

export default HomeScreen;
