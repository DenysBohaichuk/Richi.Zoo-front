import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const apiClient = axios.create({
        baseURL: config.public.apiURL,
        // інші налаштування
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    // Додаємо apiClient в контекст nuxtApp
    nuxtApp.provide('apiClient', apiClient);
});
