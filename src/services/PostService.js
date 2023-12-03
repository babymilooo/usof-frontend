import $api, { API_URL } from "../http";

export default class PostService {
    static async getAllLikesForPost(postId) {
        try {
            const response = await $api.get(`${API_URL}/posts/${postId}/like`);
            if (response.status === 200) {
                console.log(response);
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async createPost(title, content, categories) {
        try {
            const response = await $api.post(`${API_URL}/posts`, { title, content, categories });
            if (response.status === 200) {
                console.log(response);
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async deletePost(postId) {
        try {
            const response = await $api.delete(`${API_URL}/posts/${postId}`);
            if (response.status === 200) {
                console.log(response);
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
    static async updatePost(postId) {
        try {
            const response = await $api.patch(`${API_URL}/posts/${postId}`);
            if (response.status === 200) {
                console.log(response);
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}