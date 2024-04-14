import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum Role {
    Patient = 'Patient',
    Staff = 'Staff',
}

interface RoleState {
    role: Role | null;
}

const initialState: RoleState = {
    role: null,
};

export const roleSlice = createSlice({
    name: 'RoleName',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload;
        },
        clearRole: (state) => {
            state.role = null;
        },
    },
});

export const { setRole, clearRole } = roleSlice.actions;

export const selectRole = (state: RootState) => state.role.role ;

export default roleSlice.reducer;
