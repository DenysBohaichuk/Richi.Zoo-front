// apiClient.js
import axios from 'axios';

const APP_URL = this.$config.appURL;

const apiClient = axios.create({
    baseURL: APP_URL,
    // інші глобальні налаштування
});

export default apiClient;