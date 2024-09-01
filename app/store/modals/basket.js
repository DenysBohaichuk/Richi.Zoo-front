// store/modals/favorite.js
import { defineStore } from 'pinia';

export const useProductBasketStore = defineStore('modals.basket', {
    state: () => ({
        open: false,
        productBasket: [],
    }),
    actions: {
        openModal() {
            this.open = true;
        },
        closeModal() {
            this.open = false;
        },
        getData(){
            this.productBasket = JSON.parse(window.localStorage.getItem('productBasket'));
        },
        setData(products){
            window.localStorage.setItem('productBasket', JSON.stringify(products.value));
        }
    }
});
