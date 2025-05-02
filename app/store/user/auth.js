// store/modals/user/auth.js
import { defineStore } from 'pinia';
import {parseJwt} from "~/utils/jwt.js";

export const useAuthStore  = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null,
        userToken: null
    }),
    actions: {
        userData() {
            this.isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
            this.userToken = JSON.parse(window.localStorage.getItem('userToken')) || null;
            this.user = this.userToken ? parseJwt(this.userToken) : null;
        },
        logout(){
            localStorage.setItem('loggedIn', 'false');
            localStorage.removeItem('userToken');
            this.isLoggedIn = false;
            this.userToken = null;
        }
    }
});
