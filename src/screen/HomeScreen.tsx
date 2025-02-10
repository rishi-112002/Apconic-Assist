import React from "react";
import { Text, View, ActivityIndicator, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../assest/color/colors";
import TopLeftModal from "../resueableComponent/Modal";
import HomeScreenEffect from "../functions/HomeScreenEffeects";
import { STYLES } from "../styles/ScreenStyles";
import StringConstants from "../assest/constants/StringsConstants";

function HomeScreen() {
  const { employees, loading, makeCall, modalVisible, setModalVisible, status } = HomeScreenEffect();
  const {ON_LEAVE,ON_LEAVE_FROM,OUTSIDE,OUTSIDE_FROM,PRESENT,STATUS_UPDATED_AT,UNKNOWN} = StringConstants();
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={STYLES.container}>
      <TopLeftModal modalVisible={modalVisible} setModalVisible={setModalVisible} value={status} />

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: any) => (
          <View style={STYLES.card}>
            <View style={STYLES.cardContent}>
              <View style={[STYLES.statusContainer, {
                backgroundColor: item.status === PRESENT ? colors.greenDarkest : item.status === ON_LEAVE ? colors.redSoftner : "orange"
              }]}
              >
                <Text style={[STYLES.value, {
                  color: item.status !== UNKNOWN ? colors.white : colors.gray,
                  fontSize: 12
                }]}>
                  {item.status}
                </Text>
              </View>
              <Text style={STYLES.title}>{item.firstName} {item.lastName}</Text>
              <View style={STYLES.infoContainer}>
                <View>
                  <Text style={STYLES.value}>{item.email}</Text>
                  {item.status !== PRESENT && (
                    <Text style={STYLES.label}>
                      {item.status === ON_LEAVE ? ON_LEAVE_FROM : item.status === OUTSIDE ? OUTSIDE_FROM : STATUS_UPDATED_AT}:
                      <Text style={STYLES.value}>{new Date(item?.stausUpdatedAt?.toDate()).toLocaleString()}</Text>
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={STYLES.callButtonContainer}>
              <TouchableOpacity onPress={() => makeCall(item.mobilePhone)} style={STYLES.callButton}>
                <Image source={require("../assest/icons/phone_icon_white.png")} style={STYLES.callIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}


export default HomeScreen;
