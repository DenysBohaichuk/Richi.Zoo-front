/**
 * Робота з категоріями
 */

import apiService from '~~/server/api/apiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import {responseFormat} from "~~/server/api/responses/responseFormat.js";


const { response, createData } = apiService();

export const orderService = {
    async createOrder(payload){
        await createData(apiPath.create_order, payload)
        return responseFormat.response(response.value);
    },


}