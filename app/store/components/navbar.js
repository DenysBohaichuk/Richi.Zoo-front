// stores/categoryStore.js
import { defineStore } from 'pinia';
import {apiMethods} from "~/composables/api/methods/apiMethods.js";
import {useModalInfoStore} from "~/store/modals/info.js";

export const useNavbarStore = defineStore('navbar', {
    state: () => ({
        categoriesDropdown: null,
    }),
    actions: {
        async getCategoriesDropdown(){
            const modalInfoStore = useModalInfoStore();

            try {
                this.categoriesDropdown = await apiMethods.getListCategories();

                if (!this.categoriesDropdown.status) {
                    const errorMessage = this.categoriesDropdown.message || 'Error fetching categories';
                    console.log(errorMessage)
                 //  modalInfoStore.openModal(false, errorMessage);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    }
});
