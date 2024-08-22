/**
 * Робота з категоріями
 */

import apiService from '~~/server/api/apiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import {responseFormat} from "~~/server/api/responses/responseFormat.js";


const { response, fetchData } = apiService();

export const categoryService = {
    async getCategory(slug){
        await fetchData(apiPath.category + slug)
        return responseFormat.response(response.value);
    },

    async getListCategories(){
        await fetchData(apiPath.categories)
        return responseFormat.response(response.value);
    }
}