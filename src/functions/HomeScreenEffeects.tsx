/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState, useEffect, useLayoutEffect} from 'react';
import {Linking, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../assest/color/colors';
import {loginUser, updateStatus} from '../redux/login/LoginAction';
import {RootState, store} from '../redux/Store';
import UserBadge from '../resueableComponent/UserBadge';
import {STYLES, HomeSTYLES} from '../styles/ScreenStyles';
import firestore from '@react-native-firebase/firestore';
import {AuthStackScreenName} from '../navigation/HomeNavigation';
import StringConstants from '../assest/constants/StringsConstants';
import {Option, Outdent} from 'lucide-react-native';

function HomeScreenEffect() {
  const {ON_LEAVE, PRESENT, OUTSIDE} = StringConstants();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('Present');
  const [modalVisible, setModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [toValue, setToValue] = useState('');
  const [fromValue, setFromValue] = useState('');

  const navigation = useNavigation<NavigationProp<AuthStackScreenName>>();

  const userEmail = useSelector(
    (state: RootState) => state.authentication.userEmail,
  );
  const userId = useSelector(
    (state: RootState) => state.authentication.employeeId,
  );
  const userName = useSelector((state: RootState) => state.authentication.name);
  const status = useSelector((state: RootState) => state.authentication.status);

  const STATUS_OPTIONS = [PRESENT, ON_LEAVE, OUTSIDE];
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    if (userEmail) {
      store.dispatch(loginUser({userEmail}));
    } else {
      navigation.navigate('LoginScreen');
    }
  }, [userEmail, userName, userId, status]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('employees')
      .onSnapshot(snapshot => {
        const employeeList = snapshot.docs
          .map(doc => ({id: doc.id, ...doc.data()}))
          .filter(employee => employee.email !== userEmail);
        setEmployees(employeeList);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [userEmail, status]);

  const makeCall = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(err =>
      console.error('Failed to open dialer', err),
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Present':
        return {
          backgroundColor: colors.greenSoftneer,
          color: colors.greenDarkest,
        };
      case 'Outside':
        return {backgroundColor: colors.softOrange, color: 'orange'};
      case 'On-leave':
        return {backgroundColor: colors.redSoftner, color: colors.redDarkest};
      default:
        return {};
    }
  };
  const closeCalendarModal = () => setCalendarVisible(false);

  const handleStatusChange = (newStatus: string) => {
    console.log('Selected Status: -', newStatus);
    if (newStatus === ON_LEAVE) {
      setCalendarVisible(true);
      console.log('On Leave Selected : -', newStatus);
      setSelectedStatus(newStatus);
    } else {
      store.dispatch(updateStatus({status, employeeId: userId, newStatus}));
      setSelectedStatus(newStatus);
    }
  };

  //   const handleDateSelect = (
  //     formattedDate: string,
  //     _dateValue: any,
  //     type: 'from' | 'to',
  //   ) => {
  //     if (type === 'from') {
  //       setFromValue(formattedDate);
  //     } else {
  //       setToValue(formattedDate);

  //       // Ensure `fromValue` is properly set before dispatching
  //       setTimeout(() => {
  //         store.dispatch(
  //           updateStatus({
  //             status: status ?? '',
  //             employeeId: userId,
  //             newStatus: ON_LEAVE,
  //             tovalue: formattedDate,
  //             FromValue: fromValue, // Ensure correct value is used
  //           }),
  //         );

  //         setSelectedStatus('OnLeave');
  //         setCalendarVisible(false);
  //       }, 100); // Adding a slight delay ensures the state update reflects
  //     }
  //   };

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
          newStatus: ON_LEAVE,
          tovalue: formattedDate,
          FromValue: fromValue,
        }),
      );
      closeCalendarModal(); // Close modal after selecting "To" date
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Employees
        </Text>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 15}}></TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{flexDirection: 'row', marginRight: 15, alignItems: 'center'}}>
          {STATUS_OPTIONS.map(option => {
            const isSelected = selectedStatus === option;

            // const {backgroundColor, textColor} = getStatusStyle(option);
            // getStatusStyle(isSelected);
            return (
              <Pressable
                key={option}
                onPress={() => handleStatusChange(option)}
                style={[
                  HomeSTYLES.statusButton,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: isSelected
                      ? getStatusStyle(selectedStatus).backgroundColor
                      : '#ddd',
                    padding: 3,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  },
                ]}>
                <Text
                  style={{
                    color: isSelected
                      ? getStatusStyle(selectedStatus).color
                      : '#000',
                    fontWeight: isSelected ? 'bold' : 'normal',
                  }}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
          <UserBadge
            userName={userName}
            status={status}
            onPress={() => setModalVisible(true)}
          />
        </View>
      ),
    });
  }, [navigation, status, selectedStatus]);

  return {
    employees,
    loading,
    makeCall,
    userId,
    modalVisible,
    setModalVisible,
    status,
    isCalendarVisible,
    handleDateSelect,
    closeCalendarModal: () => setCalendarVisible(false),
    setCalendarVisible,
    toValue,
    fromValue,
  };
}

export default HomeScreenEffect;
