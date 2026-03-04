import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = 'resident' | 'management' | null;

interface AuthState {
    role: UserRole;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    role: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserRole>) => {
            state.role = action.payload;
        },
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logout: (state) => {
            state.role = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setRole, setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;