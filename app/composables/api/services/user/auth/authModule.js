/**
 * Модуль для роботи з обліковим записом клієнта.
 *
 * Він виконує роль "прокладки" між зверненням до API та подальшою обробкою даних у внутрішніх компонентах системи,
 * забезпечуючи уніфікований інтерфейс для аутентифікації, реєстрації та управління сесією користувача.
 */
import AuthService from "~/composables/api/services/user/auth/authService.js";
import {useAuthStore} from "~/store/user/auth.js";


export const authModule = {
    async signup(user) {
        return await AuthService.signup(user);
    },

    async verifyEmail(token) {
        return await AuthService.verifyEmail(token);
    },

    async login(user) {
        const resp = await AuthService.login(user);
        if (resp && resp.status) {
            this.userLogin(resp.data.token);
        }
        return resp;
    },

    async googleAuth(user) {
        const resp = await AuthService.googleAuth(user);
        if (resp && resp.status) {
            this.userLogin(resp.data.token);
        }
        return resp;
    },

    userLogin(userToken) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userToken', JSON.stringify(userToken));
        useAuthStore().userData();
    },


};

