// stores/categoryStore.js
import { defineStore } from 'pinia';
import {apiMethods} from "~~/server/api/methods/apiMethods.js";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categoryData: null,
    }),
    actions: {
       async getCategoryData(slug){
            this.categoryData = await apiMethods.getCategory(slug)
        },
    }
});
