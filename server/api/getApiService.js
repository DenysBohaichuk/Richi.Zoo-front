import { useNuxtApp } from '#app';
import apiService from '~~/server/api/apiService.js';

function getApiService() {
    const { $apiClient } = useNuxtApp();
    return apiService($apiClient);
}

export default getApiService;
