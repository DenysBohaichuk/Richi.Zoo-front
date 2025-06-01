// stores/categoryStore.js
import { defineStore } from 'pinia';
import {apiMethods} from "~/composables/api/methods/apiMethods.js";

export const useNavbarStore = defineStore('navbar', {
    state: () => ({
        categoriesDropdown: null,
        isLoading: false,
    }),
    actions: {
        async getCategoriesDropdown(){
            if (this.isLoading) return
            try {
                this.isLoading = true;


                const res = await apiMethods.getListCategories();


                if (!res.status) {
                    const errorMessage = res.message || 'Error fetching categories';
                    console.log(errorMessage)
                } else {
                    this.categoriesDropdown = res || []
                    this.isLoading = false
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                this.isLoading = false;
            }
        },
    }
});
