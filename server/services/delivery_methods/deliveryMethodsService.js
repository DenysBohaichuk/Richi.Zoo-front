/**
 * Робота з методами замовленнями
 */

import getApiService from '~~/server/api/getApiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import { responseFormat } from "~~/server/api/responses/responseFormat.js";

export const deliveryMethodsService = {
    async getDeliveryMethods() {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.delivery_methods);
        return responseFormat.response(response.value);
    }
};
