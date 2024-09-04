import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const apiClient = axios.create({
        baseURL: config.public.apiURL,
        // інші налаштування
    });

    // Додаємо apiClient в контекст nuxtApp
    nuxtApp.provide('apiClient', apiClient);
});
