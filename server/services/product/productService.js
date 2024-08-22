/**
 * Робота з категоріями
 */

import apiService from '~~/server/api/apiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import {responseFormat} from "~~/server/api/responses/responseFormat.js";


const { response, fetchData } = apiService();

export const productService = {
    async getProduct(id){
        await fetchData(apiPath.products + "/" + id)
        return responseFormat.response(response.value);
    },

    async getProductsBySearch(query){
        await fetchData(apiPath.search_product + "?q=" + query)
        return responseFormat.response(response.value);
    },

}