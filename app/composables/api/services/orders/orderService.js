/**
 * Робота з замовленнями
 */
import apiPath from "~/composables/api/endpoints/apiPaths.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";
import {useAuthStore} from "~/store/user/auth.js";


export const orderService = {
    async createOrder(payload) {
        const { response, postData } = getApiService();
        await postData(apiPath.create_order, payload);
        return responseFormat.response(response.value);
    },

    async payment(id) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.payment(id)}`);
        return responseFormat.response(response.value);
    },

    async getOrders() {
        const { response, fetchData } = getApiService();
        const authStore = useAuthStore();

        await fetchData(`${apiPath.get_orders}`, {token: authStore.userToken});
        return responseFormat.response(response.value);
    },
};
