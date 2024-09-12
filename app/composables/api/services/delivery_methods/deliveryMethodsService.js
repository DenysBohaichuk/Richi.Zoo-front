/**
 * Робота з методами замовленнями
 */
import apiPath from "~/composables/api/endpoints/apiPaths.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";

export const deliveryMethodsService = {
    async getDeliveryMethods() {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.delivery_methods);
        return responseFormat.response(response.value);
    }
};
