// store/modals/favorite.js
import { defineStore } from 'pinia';

export const useProductBasketStore = defineStore('modals.basket', {
    state: () => ({
        isOpen: false,
        productBasket: [],
    }),
    actions: {
        toggleModal() {
            this.isOpen = !this.isOpen;
        },
        getData(){
            this.productBasket = JSON.parse(window.localStorage.getItem('productBasket'));
        },
        setData(products){
            window.localStorage.setItem('productBasket', JSON.stringify(products.value));
        }
    }
});
