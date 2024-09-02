/**
 * Робота з замовленнями
 */

import getApiService from '~~/server/api/getApiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import { responseFormat } from "~~/server/api/responses/responseFormat.js";

export const orderService = {
    async createOrder(payload) {
        const { response, createData } = getApiService();
        await createData(apiPath.create_order, payload);
        return responseFormat.response(response.value);
    }
};
