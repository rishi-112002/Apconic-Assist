import { createSlice } from "@reduxjs/toolkit";
import { CheckUserlogin, loginUser } from "./LoginAction";

const initialState: {
    userEmail: string | null,
    name: string | null,
    mobileNo: string | null,
    status: string | null,
    loading: boolean,
    error: string | null,
    employeeId: string | null,
} = {
    userEmail: null,
    name: null,
    mobileNo: null,
    status: null,
    loading: false,
    error: null,
    employeeId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.userEmail = null;
            state.name = null;
            state.mobileNo = null;
            state.status = null;
            state.loading = false;
            state.error = null;
        },
        changeStatus: (state, action ) => {
            // console.log("status in reducer", action.payload);
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userEmail = action.payload.userEmail;
                state.name = action.payload.name;
                state.mobileNo = action.payload.mobileNo;
                state.status = action.payload.status;
                state.employeeId = action.payload.employeeId;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })
            .addCase(CheckUserlogin.fulfilled, (state, action) => {
                state.userEmail = action.payload.email;
                state.name = action.payload.name;
                state.mobileNo = action.payload.mobileNo;
                state.status = action.payload.status;
                state.employeeId = action.payload.employeeId;
            }).addCase(CheckUserlogin.rejected, (state, action) => {
                state.error = action.payload as string | null;
            });
    },
});

export const { logoutUser  , changeStatus} = authSlice.actions;
export default authSlice;
