import { createSlice} from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

// Define a type for the slice state
interface checkedInState {
    selectedHospital: boolean;
}

const initialState: checkedInState = {
    selectedHospital: false,
};

export const checkedInSlice = createSlice({
    name: 'checkedIn',
    initialState,
    reducers: {
        setCheckedIn: (state) => {
            state.selectedHospital = true;
        },
        clearCheckedIn: (state) => {
            state.selectedHospital = false;
        },
    },
});

export const { setCheckedIn, clearCheckedIn } = checkedInSlice.actions;

export const selectCheckedIn = (state: RootState) => state.checkedIn.selectedHospital;

export default checkedInSlice.reducer;
