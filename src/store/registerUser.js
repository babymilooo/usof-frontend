import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ login, password, fullname, email }, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(login, password, fullname, email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);