import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './registerUser';
import { loginUser } from './loginUser';
import { chechAuth } from './IsAuthUser';
import { logoutUser } from './logoutUser';
import { updateProfile } from './updateProfile';
import { updateAvatar } from './updateAvatar';

const initialState = {
    login: null,
    isLoggedIn: false,
    email: null,
    id: null,
    profilePicture: null,
    rating: null,
    role: null,
    fullName: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.email = null;
            state.id = null;
            state.profilePicture = null;
            state.rating = null;
            state.role = null;
            state.fullName = null;
            state.login = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.email = action.payload.email;
                state.id = action.payload.id;
                state.profilePicture = action.payload.profilePicture;
                state.rating = action.payload.rating;
                state.role = action.payload.role;
                state.fullName = action.payload.fullName;
                state.login = action.payload.login;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || 'Не удалось зарегистрироваться';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("login");
                state.email = action.payload.email;
                state.id = action.payload.id;
                state.profilePicture = action.payload.profilePicture;
                state.rating = action.payload.rating;
                state.role = action.payload.role;
                state.fullName = action.payload.fullName;
                state.login = action.payload.login;
                state.isLoggedIn = true;
            })
            .addCase(chechAuth.fulfilled, (state, action) => {

                state.email = action.payload.email;
                state.id = action.payload.id;
                state.profilePicture = action.payload.profilePicture;
                state.rating = action.payload.rating;
                state.role = action.payload.role;
                state.fullName = action.payload.fullName;
                state.login = action.payload.login;
                state.isLoggedIn = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.login = null;
                state.isLoggedIn = false;
                state.email = null;
                state.id = null;
                state.profilePicture = null;
                state.rating = null;
                state.role = null;
                state.fullName = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                console.log("profile updated");
                state.email = action.payload.email;
                state.id = action.payload.id;
                state.profilePicture = action.payload.profilePicture;
                state.rating = action.payload.rating;
                state.role = action.payload.role;
                state.fullName = action.payload.fullName;
                state.login = action.payload.login;
                state.isLoggedIn = true;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                console.log("avatar updated");
                state.profilePicture = action.payload.profilePicture;
            })
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
