import $api, { API_URL } from "../http";

export default class UserService {
    static async updateProfile(profileData) {
        try {
            const response = await $api.patch(`${API_URL}/users/${profileData.id}`, profileData);
            if (response.status === 200) {
                console.log(response);
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
                console.log(response);
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
                console.log(response);
                return response.data;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getAllPost() {
        try {
            const response = await $api.get(`${API_URL}/posts`);
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}
