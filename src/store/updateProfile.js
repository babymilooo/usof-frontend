import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/UserService";

export const updateProfile = createAsyncThunk(
    'user/editProfile',
    async ({ profileData }, { rejectWithValue }) => {
        try {
            const response = await UserService.updateProfile(profileData);
            console.log("profile changed")
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);