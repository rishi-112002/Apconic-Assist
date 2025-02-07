import { createAsyncThunk } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
    "Login User",
    async (
        params: {
            userEmail: string;
        },
        { rejectWithValue }
    ) => {
        const { userEmail } = params;

        try {
            const userQuerySnapshot = await firestore()
                .collection("employees")
                .where("email", "==", userEmail)
                .get();

            const employeeDoc = userQuerySnapshot.docs[0];
            const employeeId = employeeDoc.id;
            if (userQuerySnapshot.empty) {

                return rejectWithValue("USER_NOT_FOUND");
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();
            // console.log("id", employeeId)
            const userDetails = {
                userEmail: userData.email || "",
                name: `${userData.firstName} ${userData.lastName}`,
                mobileNo: userData.mobilePhone || "",
                status: userData.status || "Unknown",
                employeeId: employeeId || "",
            };
            await AsyncStorage.setItem("name", userDetails.name);
            await AsyncStorage.setItem("email", userDetails.userEmail)
            await AsyncStorage.setItem("mobileNo", userDetails.mobileNo)
            await AsyncStorage.setItem("status", userDetails.status)
            await AsyncStorage.setItem("employeeId", employeeId);
            console.log("run of login Action")
            return userDetails;
        } catch (err) {
            return rejectWithValue("LOGIN_ERROR_SOMETHING_WRONG");
        }
    }
);
export const CheckUserlogin = createAsyncThunk(
    "USER_LOGIN_STATUS",
    async (_, thunkAPI) => {
        try {
            const userName = await AsyncStorage.getItem("name");
            const userEmail = await AsyncStorage.getItem("email")
            const mobileNo = await AsyncStorage.getItem("mobileNo")
            const userStatus = await AsyncStorage.getItem("status")
            const UserId = await AsyncStorage.getItem("employeeId");
            const detail = {
                name: userName,
                email: userEmail,
                mobileNo: mobileNo,
                status: userStatus,
                employeeId: UserId
            };
          
            if (userName && userEmail && mobileNo && userStatus && UserId) {
                return detail;
            } else {
                return thunkAPI.rejectWithValue("ERROR");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);
