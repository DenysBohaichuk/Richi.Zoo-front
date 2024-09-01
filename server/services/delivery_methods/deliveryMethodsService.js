/**
 * Робота з категоріями
 */

import apiService from '~~/server/api/apiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import {responseFormat} from "~~/server/api/responses/responseFormat.js";


const { response, fetchData } = apiService();

export const deliveryMethodsService = {
    async getDeliveryMethods(){
        await fetchData(apiPath.delivery_methods)
        return responseFormat.response(response.value);
    },


}