import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "services/auth/baseQuery";
import authReducer from "./slices/authSlice";
import geoReducer from "./slices/geoSlice";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    geo: geoReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: import.meta.env.MODE === "development",
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(api.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];