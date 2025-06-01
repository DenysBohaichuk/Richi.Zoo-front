// middleware/auth.js
import { useAuthStore } from "~/store/user/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const authStore = useAuthStore();
        console.log('middleware')
        if (!authStore.isLoggedIn) {
            await authStore.init();
        }

        if (!authStore.isLoggedIn) {
            console.log('redirect to /')
            window.location.href = '/';
            return;
        }
    }
});