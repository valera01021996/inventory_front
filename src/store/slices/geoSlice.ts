import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GeoState {
    location: string;
}

const initialState: GeoState = {
    location: "",
};

const geoSlice = createSlice({
    name: "geo",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<string>) => {
            state.location = action.payload;
        },
    },
});

export const { setLocation } = geoSlice.actions;
export default geoSlice.reducer;
