// ~/store/products/productStore.js
import { defineStore } from 'pinia';
import {apiMethods} from "~~/server/api/methods/apiMethods.js";

export const useProductStore = defineStore('product', {
    state: () => ({
        productData: null,
    }),
    actions: {
        async getProductData(id) {
            this.productData = await apiMethods.getProduct(id)
        },
    },
});
