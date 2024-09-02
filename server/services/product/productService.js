/**
 * Робота з товарами
 */

import getApiService from '~~/server/api/getApiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import { responseFormat } from "~~/server/api/responses/responseFormat.js";

export const productService = {
    async getProduct(id) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.products}/${id}`);
        return responseFormat.response(response.value);
    },

    async getProductsBySearch(query) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.search_product}?q=${query}`);
        return responseFormat.response(response.value);
    }
};
