// store/modals/favorite.js
import { defineStore } from 'pinia';

export const useSearchComponentStore = defineStore('component.search', {
    state: () => ({
        isOpen: false,
    }),
    actions: {
        openComponent() {
            this.isOpen = true;
        },
        closeComponent() {
            this.isOpen = false;
        },
    }
});
