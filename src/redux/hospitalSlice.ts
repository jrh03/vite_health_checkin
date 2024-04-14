import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

// Define a type for the slice state
interface HospitalState {
    selectedHospital: Hospital | null;
}

// Define a type for the Hospital object
export interface Hospital {
    Hospital_Name: string;
    Code: number;
}

// Define the initial state using the `HospitalState` type
const initialState: HospitalState = {
    selectedHospital: null,
};

export const hospitalSlice = createSlice({
    name: 'hospital',
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setHospital: (state, action: PayloadAction<Hospital>) => {
            state.selectedHospital = action.payload;
        },
        clearHospital: (state) => {
            state.selectedHospital = null;
        },
    },
});

export const { setHospital, clearHospital } = hospitalSlice.actions;

// Typed selector for use in components
export const selectHospital = (state: RootState) => state.hospital.selectedHospital;

export default hospitalSlice.reducer;
