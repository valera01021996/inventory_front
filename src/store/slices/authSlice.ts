import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { LoginResponse } from "types/auth";

const getInitState = () => {
    const token = localStorage.getItem("token") || "";

    return {
        access_token: token,
        refresh_token: "",
        isLoggedIn: !!token,
        lang: localStorage.getItem("i18nextLng") || "ru",
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState: getInitState(),
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            state.isLoggedIn = true;
            const data = action.payload;
            state.access_token = data.token;
            state.refresh_token = "";
            localStorage.setItem("token", data.token);
        },
        setToken: (state,action: PayloadAction<{ access: string; refresh: string }>) => {
            const { access, refresh } = action.payload;
            state.access_token = access;
            state.refresh_token = refresh;
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
        },
        logout: state => {
            state.isLoggedIn = false;
            state.access_token = "";
            state.refresh_token = "";
            localStorage.removeItem("token");
        },
    },
});

export const { setCredentials, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
