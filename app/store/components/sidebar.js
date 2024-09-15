// stores/sidebar.js
import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
    state: () => ({
        isOpen: false, // Стан для відкриття/закриття сайдбару
    }),
    actions: {
        toggleSlideOver() {
            this.isOpen = !this.isOpen; // Перемикач для відкриття/закриття
        },
        openSidebar() {
            this.isOpen = true; // Відкрити сайдбар
        },
        closeSidebar() {
            this.isOpen = false; // Закрити сайдбар
        },
    },
});
