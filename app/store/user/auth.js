// store/user/auth.js
import {defineStore} from 'pinia';
import apiPath from "~/composables/api/endpoints/apiPaths.js";
import getApiService from "~/composables/api/services/getApiService.js";

export const useAuthStore  = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null,
    }),
    actions: {
        /**
         * Ініціалізуємо сесію: пробуємо отримати /auth/me.
         */
        async init() {
            const { fetchData, response } = getApiService();
            await fetchData(`${apiPath.me}`);

            if(response.value?.status) {
                this.user = response.value.data;
                console.log('login true')

                this.isLoggedIn = true;
            } else {
                this.user = null;
                this.isLoggedIn = false;
            }
        },

        /**
         * Логаут: дзвонимо в /auth/logout,
         * браузер очистить кукі, а ми оновимо стан.
         */
        async logout() {
            const { postData } = getApiService();

            await postData(`${apiPath.logout}`);
            this.user = null;
            this.isLoggedIn = false;
        },
    }
});
