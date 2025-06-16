/**
 * Робота з товарами
 */

import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";
import {useAuthStore} from "~/store/user/auth.js";


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
    },

    async getProductComments(id) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.getProductComments(id)}`);
        return responseFormat.response(response.value);
    },

    async postProductComments(id, payload) {
        const { response, postData } = getApiService();
        const authStore = useAuthStore();

        await postData(`${apiPath.postProductComment(id)}`, payload, { token: authStore.userToken });
        return responseFormat.response(response.value);
    }
};
