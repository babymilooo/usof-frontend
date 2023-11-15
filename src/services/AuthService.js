import axios from "axios";
import $api, { API_URL } from "../http";

export default class AuthService {
    static async login(login, password) {
        try {
            const response = await $api.post(`${API_URL}/auth/login`, { login, password });
            console.log(response);
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async register(login, password, fullname, email) {
        try {
            const response = await $api.post(`${API_URL}/auth/register`, { login, password, fullname, email });
            console.log(response);
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async chechAuth() {
        try {
            const response = await axios.get(`${API_URL}/auth/regenerateToken`, { withCredentials: true });
            console.log(response);
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async logout() {
        try {
            const response = await $api.post(`${API_URL}/auth/logout`);
            localStorage.clear('accesstoken');
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async SendEmailToServer(email) {
        try {
            const response = await $api.post(`${API_URL}/auth/password-reset`, { email });
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async SendNewPassword(password, confirm_token) {
        try {
            const response = await $api.post(`${API_URL}/auth/password-reset/${confirm_token}`, { password });
            return response;
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

}
