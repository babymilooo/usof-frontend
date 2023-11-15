import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(login, password);
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);

                return response.data.user;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);