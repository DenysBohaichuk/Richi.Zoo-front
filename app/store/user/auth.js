// store/modals/user/info.js
import { defineStore } from 'pinia';

export const useAuthStore  = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null
    }),
    actions: {
        userStatus() {
            this.isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
            this.user = JSON.parse(window.localStorage.getItem('user')) || null;
        },
        logout(){
            localStorage.setItem('loggedIn', 'false');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.user = null;
        }
    }
});
