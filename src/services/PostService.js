import $api, { API_URL } from "../http";

export default class PostService {
    static async getAllLikesForPost(postId) {
        try {
            const response = await $api.get(`${API_URL}/posts/${postId}/like`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getAllDisLikesForPost(postId) {
        try {
            const response = await $api.get(`${API_URL}/posts/${postId}/dislike`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
    
    static async getAllCommentsForPost(postId) {
        try {
            const response = await $api.get(`${API_URL}/posts/${postId}/comments`);
            if (response.status === 200) {

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

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
    static async getPost(postId) {
        try {
            const response = await $api.get(`${API_URL}/posts/${postId}`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async getAllPost() {
        try {
            const response = await $api.get(`${API_URL}/posts`);
            if (response.status === 200) {

                return response.data;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async likePost(postId) {
        try {
            const response = await $api.post(`${API_URL}/posts/${postId}/like`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async unLikePost(postId) {
        try {
            const response = await $api.delete(`${API_URL}/posts/${postId}/like`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async disLikePost(postId) {
        try {
            const response = await $api.post(`${API_URL}/posts/${postId}/dislike`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async unDisLikePost(postId) {
        try {
            const response = await $api.delete(`${API_URL}/posts/${postId}/dislike`);
            if (response.status === 200) {

                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}