// middleware/auth.js
import { useAuthStore } from "~/store/user/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const authStore = useAuthStore();
        authStore.userData();

        if (!authStore.isLoggedIn) {
            window.location.href = '/';
            return;
        }
    }
});