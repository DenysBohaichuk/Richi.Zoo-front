import { defineNuxtPlugin } from '#app';
import axios from 'axios';
import https from 'https'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const agent = process.server
        ? new https.Agent({ rejectUnauthorized: false })
        : undefined

    const apiClient = axios.create({
        baseURL: config.public.apiURL,
        // інші налаштування
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        withCredentials: true,

        ...(agent && { httpsAgent: agent }),
    });

    // Додаємо apiClient в контекст nuxtApp
    nuxtApp.provide('apiClient', apiClient);
});
