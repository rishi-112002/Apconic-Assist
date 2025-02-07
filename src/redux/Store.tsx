import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/LoginReducer";

export const store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
       
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;