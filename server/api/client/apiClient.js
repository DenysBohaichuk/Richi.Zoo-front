// plugins/apiClient.js
import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import axios from 'axios';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const apiClient = axios.create({
        baseURL: config.public.apiURL,
        // інші глобальні налаштування
    });

    return {
        provide: {
            apiClient
        }
    };
});
