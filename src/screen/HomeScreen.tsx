import React, { useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import TopLeftModal from "../resueableComponent/Modal";
import HomeScreenEffect from "../functions/HomeScreenEffeects";
import { STYLES } from "../styles/ScreenStyles";
import UserList from "../resueableComponent/userList";
import CustomDateTimePicker from "../resueableComponent/CustomCalendar";
import { store } from "../redux/Store";
import { updateStatus } from "../redux/login/LoginAction";

function HomeScreen() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const { employees, loading, makeCall, userId, modalVisible, setModalVisible, status } = HomeScreenEffect();
  const closeCalendarModal = () => setCalendarVisible(false);
  const [tovalue, setToValue] = useState<string>('');
  const [fromValue, setFromValue] = useState<string>('');

  console.log("fromValue", fromValue)
  console.log("tovalue", tovalue)

  console.log("status in homeScreen ", status)
  const handleDateSelect = (formattedDate: string, dateValue: any, type: 'from' | 'to') => {
    // console.log(`Selected ${type} date:`, dateValue, formattedDate);
    console.log("formated date in handleDate selecte", formattedDate)
    console.log("date value in handleDate selecte", dateValue)

    if (type === 'from') {
      setFromValue(formattedDate); // Update "From" date
    } else {
      setToValue(formattedDate); // Update "To" date
      store.dispatch(updateStatus({
        status: status ?? '',
        employeeId: userId,
        newStatus: "On-leave",
        tovalue: formattedDate,
        FromValue: fromValue
      }));
      closeCalendarModal(); // Close modal after selecting "To" date
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={STYLES.container}>
      {/* <LeaveModal visible={modalVisible} onClose={closeCalendarModal} employeeId={} /> */}
      <TopLeftModal modalVisible={modalVisible} setModalVisible={setModalVisible} value={status} setCalendarVisible={setCalendarVisible} tovalue={tovalue} FromValue={fromValue} />
      <CustomDateTimePicker
        visible={isCalendarVisible}
        onClose={closeCalendarModal}
        onDateSelect={handleDateSelect}
      />
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: any) => (
          <UserList item={item} makeCall={makeCall} />
        )}
      />
    </View>
  );
}


export default HomeScreen;
