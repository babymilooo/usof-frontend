import $api, { API_URL } from "../http";

export default class CategoryService {
    static async getAllCategories() {
        try {
            const response = await $api.get(`${API_URL}/categories`);
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}
