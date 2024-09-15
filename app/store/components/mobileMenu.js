// stores/mobileMenu.js
import { defineStore } from 'pinia';

export const useMobileMenuStore = defineStore('mobileMenu', {
    state: () => ({
        isVisible: true, // Статус мобільного меню (відкрите/закрите)
    }),
    actions: {
        toggleMenu() {
            this.isVisible = !this.isVisible; // Перемкнути статус мобільного меню
        },
    },
});
