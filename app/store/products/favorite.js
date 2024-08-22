// store/modals/favorite.js
import { defineStore } from 'pinia';

export const useFavoriteProductStore = defineStore('favorite.products', {
    state: () => ({
        open: false,
        favoriteProducts: [],
    }),
    actions: {
        getData(){
            this.favoriteProducts = JSON.parse(window.localStorage.getItem('favoriteProducts'));
        }
    }
});
