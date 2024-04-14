import { createSlice} from '@reduxjs/toolkit';
import {RootState} from "./store.ts";

// Define a type for the slice state
interface checkedInState {
    checkedIn: boolean;
}

const initialState: checkedInState = {
    checkedIn: false,
};


export const checkedInSlice = createSlice({
    name: 'checkedIn',
    initialState,
    reducers: {
        setCheckedIn: (state) => {
            state.checkedIn = true;
        },
        clearCheckedIn: (state) => {
            state.checkedIn = false;
        },
    },
});

export const { setCheckedIn, clearCheckedIn } = checkedInSlice.actions;

export const selectCheckedIn = (state: RootState) => state.checkedIn.checkedIn;

export default checkedInSlice.reducer;
