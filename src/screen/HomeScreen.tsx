import React, {useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import TopLeftModal from '../resueableComponent/Modal';
import HomeScreenEffect from '../functions/HomeScreenEffeects';
import {STYLES} from '../styles/ScreenStyles';
import UserList from '../resueableComponent/userList';
import CustomDateTimePicker from '../resueableComponent/CustomCalendar';
import {store} from '../redux/Store';
import {updateStatus} from '../redux/login/LoginAction';

function HomeScreen() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const {
    employees,
    loading,
    makeCall,
    userId,
    modalVisible,
    setModalVisible,
    status,
  } = HomeScreenEffect();
  const closeCalendarModal = () => setCalendarVisible(false);
  const [tovalue, setToValue] = useState<string>('');
  const [fromValue, setFromValue] = useState<string>('');
  const handleDateSelect = (
    formattedDate: string,
    _dateValue: any,
    type: 'from' | 'to',
  ) => {
    if (type === 'from') {
      setFromValue(formattedDate); // Update "From" date
    } else {
      setToValue(formattedDate); // Update "To" date
      store.dispatch(
        updateStatus({
          status: status ?? '',
          employeeId: userId,
          newStatus: 'On-leave',
          tovalue: formattedDate,
          FromValue: fromValue,
        }),
      );
      closeCalendarModal(); // Close modal after selecting "To" date
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={STYLES.container}>
      <TopLeftModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        value={status}
        setCalendarVisible={setCalendarVisible}
        tovalue={tovalue}
        FromValue={fromValue}
      />
      <CustomDateTimePicker
        visible={isCalendarVisible}
        onClose={closeCalendarModal}
        onDateSelect={handleDateSelect}
      />
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({item}: any) => (
          <UserList item={item} makeCall={makeCall} />
        )}
      />
    </View>
  );
}

export default HomeScreen;
