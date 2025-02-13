import { createSlice } from "@reduxjs/toolkit";
import { CheckUserlogin, loginUser, LogOutUser, updateStatus } from "./LoginAction";
const initialState: {
    userEmail: string | null,
    name: string | null,
    mobileNo: string | null,
    status: string | null | undefined,
    loading: boolean,
    error: string | null,
    employeeId: string | null,
    currentStatusId: string | null,
    From: any,
    To: any
} = {
    userEmail: null,
    name: null,
    mobileNo: null,
    status: null,
    loading: false,
    error: null,
    employeeId: null,
    currentStatusId: null,
    From: null,
    To: null,

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeStatus: (state, action) => {
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
            }).addCase(LogOutUser.fulfilled, (state) => {
                state.userEmail = null;
                state.name = null;
                state.mobileNo = null;
                state.status = null;
                state.loading = false;
                state.error = null;
            }).addCase(updateStatus.fulfilled, (State, action) => {
                State.status = action.payload?.newStatus;
                State.currentStatusId = action.payload?.docId ?? null
                State.From = action.payload?.From?.toString() ?? null
                State.To = action.payload?.To ?? null
            })
    },
});

export const { changeStatus } = authSlice.actions;
export default authSlice;
