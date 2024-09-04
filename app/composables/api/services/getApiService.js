import { useNuxtApp } from '#app';
import apiService from '~/composables/api/services/apiService.js';

export default function getApiService() {
    const nuxtApp = useNuxtApp();  // Отримуємо весь контекст Nuxt
    if (!nuxtApp.$apiClient) {
        console.error('apiClient не знайдено в Nuxt контексті!');
    }
    return apiService(nuxtApp.$apiClient);  // Передаємо apiClient в apiService
}
