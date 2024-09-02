import getApiService from '~~/server/api/getApiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import { responseFormat } from "~~/server/api/responses/responseFormat.js";

export const categoryService = {
    async getCategory(slug) {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.category + slug);
        return responseFormat.response(response.value);
    },

    async getListCategories() {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.categories);
        return responseFormat.response(response.value);
    }
};
