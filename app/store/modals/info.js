// store/modals/info.js
import { defineStore } from 'pinia';

export const useModalInfoStore = defineStore('modals.info', {
    state: () => ({
        open: false,
        status: null,
        message: ''
    }),
    actions: {
        openModal(status = true, message) {
            this.open = true;
            this.status = status;
            this.message = message;
        },
        closeModal() {
            this.open = false;
            this.status = false;
            this.message = '';
        },
        async getResponseMessage(dataPromise){

        }
    }
});
