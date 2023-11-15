import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { chechAuth } from './IsAuthUser';
import { logoutUser } from './logoutUser';

const initialState = {
    user: null,
    isLoggedIn: false,
    token: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || 'Не удалось зарегистрироваться';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(chechAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.isLoggedIn = false;
            })
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
