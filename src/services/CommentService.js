import $api, { API_URL } from "../http";

export default class CommentService {
    static async getAllLikesForComment(commentId) {
        try {
            const response = await $api.get(`${API_URL}/comments/${commentId}/like`);
            if (response.status === 200) {
                console.log(response);
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async createComment(content, postId) {
        try {
            const response = await $api.post(`${API_URL}/posts/${postId}`, { content });
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async likeComment(commentId) {
        try {
            const response = await $api.post(`${API_URL}/comments/${commentId}/like`);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }

    static async unLikeComment(commentId) {
        try {
            const response = await $api.delete(`${API_URL}/comments/${commentId}/like`);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}