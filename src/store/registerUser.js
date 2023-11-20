import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ login, password, fullname, email }, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(login, password, fullname, email);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);

                return response.data.user;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);