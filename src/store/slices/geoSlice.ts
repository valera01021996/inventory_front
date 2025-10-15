import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GeoState {
    region: number | null;
}

const initialState: GeoState = {
    region: null,
};

const geoSlice = createSlice({
    name: "geo",
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<number>) => {
            state.region = action.payload;
        },
    },
});

export const { setLocation } = geoSlice.actions;
export default geoSlice.reducer;
