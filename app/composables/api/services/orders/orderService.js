/**
 * Робота з замовленнями
 */
import apiPath from "~/composables/api/endpoints/apiPaths.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";


export const orderService = {
    async createOrder(payload) {
        const { response, postData } = getApiService();
        await postData(apiPath.create_order, payload);
        return responseFormat.response(response.value);
    }
};
