import $api, { API_URL } from "../http";

export default class UserService {
    static async updateProfile(profileData) {
        try {
            const response = await $api.patch(`${API_URL}/users/${profileData.id}`, profileData);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getAllPostOfUser(userId) {
        try {
            const response = await $api.get(`${API_URL}/posts/users/${userId}`);
            if (response.status === 200) {

                return response.data;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getAllCommentsOfUser(userId) {
        try {
            const response = await $api.get(`${API_URL}/comments/${userId}`);
            if (response.status === 200) {

                return response.data;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getUser(userId) {
        try {
            const response = await $api.get(`${API_URL}/users/${userId}`);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

}
