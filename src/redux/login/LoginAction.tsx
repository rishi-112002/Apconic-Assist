/* eslint-disable quotes */
import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StringConstants from '../../assest/constants/StringsConstants';
const {
  ON_LEAVE,
  OUTSIDE,
  EMAIL,
  NAME,
  EMPLOYEES,
  MOBILE_NO,
  STATUS,
  EMPLOYEE_ID,
  UNKNOWN,
  STATUSLOG,
} = StringConstants();
export const loginUser = createAsyncThunk(
  'Login User',
  async (
    params: {
      userEmail: string;
    },
    {rejectWithValue},
  ) => {
    const {userEmail} = params;

    try {
      const userQuerySnapshot = await firestore()
        .collection(EMPLOYEES)
        .where(EMAIL, '==', userEmail)
        .get();

      const employeeDoc = userQuerySnapshot.docs[0];
      const employeeId = employeeDoc.id;
      if (userQuerySnapshot.empty) {
        return rejectWithValue('USER_NOT_FOUND');
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();

      const userDetails = {
        userEmail: userData.email || '',
        name: `${userData.firstName} ${userData.lastName}`,
        mobileNo: userData.mobilePhone || '',
        status: userData.status || UNKNOWN,
        employeeId: employeeId || '',
      };
      await AsyncStorage.setItem(NAME, userDetails.name);
      await AsyncStorage.setItem(EMAIL, userDetails.userEmail);
      await AsyncStorage.setItem(MOBILE_NO, userDetails.mobileNo);
      await AsyncStorage.setItem(STATUS, userDetails.status);
      await AsyncStorage.setItem(EMPLOYEE_ID, employeeId);

      return userDetails;
    } catch (err) {
      return rejectWithValue('LOGIN_ERROR_SOMETHING_WRONG');
    }
  },
);
export const CheckUserlogin = createAsyncThunk(
  'USER_LOGIN_STATUS',
  async (_, thunkAPI) => {
    try {
      const userName = await AsyncStorage.getItem(NAME);
      const userEmail = await AsyncStorage.getItem(EMAIL);
      const mobileNo = await AsyncStorage.getItem(MOBILE_NO);
      const userStatus = await AsyncStorage.getItem(STATUS);
      const UserId = await AsyncStorage.getItem(EMPLOYEE_ID);
      const detail = {
        name: userName,
        email: userEmail,
        mobileNo: mobileNo,
        status: userStatus,
        employeeId: UserId,
      };
      if (userName && userEmail && mobileNo && userStatus && UserId) {
        return detail;
      } else {
        return thunkAPI.rejectWithValue('ERROR');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const LogOutUser = createAsyncThunk(
  'Logout_user',
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem(NAME);
      await AsyncStorage.removeItem(EMAIL);
      await AsyncStorage.removeItem(MOBILE_NO);
      await AsyncStorage.removeItem(STATUS);
      await AsyncStorage.removeItem(EMPLOYEE_ID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateStatus = createAsyncThunk(
  'updateStatus',
  async (params: {
    status: string;
    newStatus: string;
    employeeId: string | null;
    tovalue: string;
    FromValue: string;
  }) => {
    const {employeeId, newStatus, tovalue, FromValue, status} = params;

    try {
      if (!employeeId) {
        return null;
      }

      // Update employee's main status

      let docId = null;
      let From = null;
      let To = null;
      const getCurrentFormattedTime = () => {
        const now = new Date();

        // Extract month, day, and year separately
        const optionsDate = {
          month: 'long' as const,
          day: 'numeric' as const,
          year: 'numeric' as const,
        };
        let formattedDate = new Intl.DateTimeFormat(
          'en-US',
          optionsDate,
        ).format(now);

        // Remove the comma between day and year
        formattedDate = formattedDate.replace(',', '');

        // Format time separately
        const optionsTime = {
          hour: 'numeric' as const,
          minute: 'numeric' as const,
          second: 'numeric' as const,
          hour12: true,
        };
        const formattedTime = new Intl.DateTimeFormat(
          'en-US',
          optionsTime,
        ).format(now);

        return `${formattedDate} at ${formattedTime}`;
      };

      console.log('current time ', getCurrentFormattedTime()); // Example: "February 18 2025 at 3:13:00 PM"

      const statusLogRef = firestore()
        .collection(EMPLOYEES)
        .doc(employeeId)
        .collection(STATUSLOG);

      // Handle ON_LEAVE or OUTSIDE case (log new status)
      if (newStatus === OUTSIDE) {
        const docRef = await statusLogRef.add({
          status: newStatus,
          From: getCurrentFormattedTime(),
          To: '',
          statusUpdatedAt: getCurrentFormattedTime(),
        });

        docId = docRef.id;
        (From = getCurrentFormattedTime()), (To = '');
      } else if (newStatus === ON_LEAVE) {
        const docRef = await statusLogRef.add({
          status: newStatus,
          From: FromValue ? FromValue : '',
          To: tovalue ? tovalue : '',
          statusUpdatedAt: getCurrentFormattedTime(),
        });

        docId = docRef.id;
        From = FromValue ? FromValue : '';
        To = tovalue ? tovalue : '';
      } else {
        const docRef = await statusLogRef.add({
          status: newStatus,
          statusUpdatedAt: getCurrentFormattedTime(),
        });

        docId = docRef.id;
        From = null;
        To = null;
      }

      // If the previous status was OUTSIDE and is changing, update the last OUTSIDE record
      if (status === OUTSIDE && newStatus !== status) {
        const querySnapshot = await statusLogRef
          .where(STATUS, '==', OUTSIDE)
          .limit(1)
          .get();
        if (!querySnapshot.empty) {
          const lastOutsideDoc = querySnapshot.docs[0];

          await statusLogRef.doc(lastOutsideDoc.id).update({
            To: getCurrentFormattedTime(),
          });
        }
      }
      await firestore().collection(EMPLOYEES).doc(employeeId).update({
        status: newStatus,
        statusUpdatedAt: getCurrentFormattedTime(),
        From: From,
        To: To,
      });

      // Log general status update

      return {
        newStatus,
        From,
        To,
        docId,
      };
    } catch (error) {
      throw error;
    }
  },
);
