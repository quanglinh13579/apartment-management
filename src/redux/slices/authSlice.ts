import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserRole = 'resident' | 'management' | null;

interface AuthState {
    role: UserRole;          
    selectedRole: UserRole;     
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    role: null,
    selectedRole: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSelectedRole: (state, action: PayloadAction<UserRole>) => {
            state.selectedRole = action.payload;
        },
        setRole: (state, action: PayloadAction<UserRole>) => {
            state.role = action.payload;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.role = null;
            state.selectedRole = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setSelectedRole, setRole, setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;