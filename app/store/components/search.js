// store/modals/favorite.js
import { defineStore } from 'pinia';

export const useSearchComponentStore = defineStore('component.search', {
    state: () => ({
        open: false,
    }),
    actions: {
        openComponent() {
            this.open = true;
        },
        closeComponent() {
            this.open = false;
        },
    }
});
