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
}