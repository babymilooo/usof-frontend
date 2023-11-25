import axios from 'axios';

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response.status === 401 && error.config && !error.config._iRetry) {
        const originalRequest = error.config;
        originalRequest._iRetry = true;
        try {
            const response = await axios.get(`${API_URL}/auth/regenerateToken`, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log("non authorized")
        }
    }
    throw error;
})

export default $api;