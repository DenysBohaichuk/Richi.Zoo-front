// apiClient.js
import axios from 'axios';

const BASE_URL = 'http://richizoo.dev.com/api'; // Замініть на ваш базовий URL

const apiClient = axios.create({
    baseURL: BASE_URL,
    // інші глобальні налаштування
});

export default apiClient;