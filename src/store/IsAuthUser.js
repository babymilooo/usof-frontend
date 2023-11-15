import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const chechAuth = createAsyncThunk(
    'user/renegerateToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.chechAuth();
            const { accessToken, user } = response.data;

            localStorage.setItem('accessToken', accessToken);
            return user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);