import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import getApiService from "~/composables/api/services/getApiService.js";

export const pageService = {
    async getContent(slug) {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.page_content + slug);

        return responseFormat.response(response.value);
    },
};
