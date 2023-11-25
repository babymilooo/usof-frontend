import { createAsyncThunk } from "@reduxjs/toolkit";
import FileService from "../services/FileService";

export const updateAvatar = createAsyncThunk(
    'user/editAvatar',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const response = await FileService.sendAvatar(formData);

            console.log("avatar changed");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);