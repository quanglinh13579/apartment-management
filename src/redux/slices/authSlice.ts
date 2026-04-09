import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserRole = 'resident' | 'management' | null;

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    role: UserRole;          
    selectedRole: UserRole;     
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    role: null,
    selectedRole: null,
    isAuthenticated: false,
    loading: false,
    error: null,
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
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            if (action.payload) {
                state.isAuthenticated = true;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
            state.selectedRole = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { 
    setSelectedRole, 
    setRole, 
    setAuthenticated, 
    setUser, 
    setLoading, 
    setError, 
    logout 
} = authSlice.actions;

export default authSlice.reducer;