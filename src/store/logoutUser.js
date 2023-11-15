import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('accessToken');
            return response.data;
        } catch (error) {
            console.error(error.response?.data?.message);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);
