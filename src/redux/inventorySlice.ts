// src/redux/inventorySlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../types/inventory";

interface InventoryState {
    selectedLocationId: string;
}

const initialState: InventoryState = {
    selectedLocationId: "moscow", // Default to Moscow
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        setSelectedLocationId: (state, action: PayloadAction<string>) => {
            state.selectedLocationId = action.payload;
        },
    },
});

export const { setSelectedLocationId } = inventorySlice.actions;

export const selectSelectedLocationId = (state: RootState) =>
    state.inventory.selectedLocationId;

export default inventorySlice.reducer;
