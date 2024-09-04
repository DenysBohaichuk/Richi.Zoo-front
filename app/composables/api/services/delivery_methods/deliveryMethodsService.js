/**
 * Робота з методами замовленнями
 */
import apiPath from "~/composables/api/endpoints/apiPaths.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";
import apiService from "~/composables/api/services/apiService.js";

const { response, fetchData } = apiService();

export const deliveryMethodsService = {
    async getDeliveryMethods() {
        await fetchData(apiPath.delivery_methods);
        return responseFormat.response(response.value);
    }
};
