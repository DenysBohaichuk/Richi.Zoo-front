import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";

export const categoryService = {
    async getCategory(slug) {
        const { response, fetchData } = getApiService(); // Тепер apiClient буде переданий у apiService
        await fetchData(apiPath.category + slug);

        return responseFormat.response(response.value);
    },

    async getListCategories() {
        const { response, fetchData } = getApiService(); // Отримуємо налаштований apiService
        await fetchData(apiPath.categories);

        return responseFormat.response(response.value);
    }
};
