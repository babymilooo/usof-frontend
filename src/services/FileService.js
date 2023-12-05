import $api, { API_URL } from "../http";

export default class FileService {
    static async sendAvatar(formData) {
        try {
            const response = await $api.patch(`${API_URL}/users/avatars`, formData)
            if (response.status === 200) {
                console.log('Аватарка успешно загружена');
                return response;
            }
        } catch (e) {
            console.error(e.response?.data?.message);
        }
    }
}