/**
 * Робота з товарами
 */

import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";


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
