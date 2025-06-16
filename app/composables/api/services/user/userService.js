/**
 * Робота з товарами
 */

import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";
import {useAuthStore} from "~/store/user/auth.js";


export const userService = {
    async getProfile() {
        const { response, fetchData } = getApiService();
        const authStore = useAuthStore();

        await fetchData(`${apiPath.user}`, { token: authStore.userToken });
        return responseFormat.response(response.value);
    },

    async updateProfile(payload) {
        const { response, updateData } = getApiService();
        const authStore = useAuthStore();

        await updateData(`${apiPath.user}`, payload,{ token: authStore.userToken });
        return responseFormat.response(response.value);
    },

    async uploadAvatar(payload) {
        const { response, postData } = getApiService();
        const authStore = useAuthStore();

        await postData(`${apiPath.user_avatar}`, payload,{
            token: authStore.userToken,
            'Content-Type': 'multipart/form-data'
        });
        return responseFormat.response(response.value);
    },

    async changePassword(payload) {
        const { response, updateData } = getApiService();
        const authStore = useAuthStore();

        await updateData(`${apiPath.user_password}`, payload,{token: authStore.userToken});
        return responseFormat.response(response.value);
    },

    async getReviews() {
        const { response, fetchData } = getApiService();
        const authStore = useAuthStore();

        await fetchData(`${apiPath.get_reviews}`, {token: authStore.userToken});
        return responseFormat.response(response.value);
    },

/*    async getOrders(query) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.search_product}?q=${query}`);
        return responseFormat.response(response.value);
    },


    async getBonuses(query) {
        const { response, fetchData } = getApiService();
        await fetchData(`${apiPath.search_product}?q=${query}`);
        return responseFormat.response(response.value);
    }*/
};
