// composables/useFavoriteProducts.js

import { ref } from 'vue';
import { useFavoriteProductStore } from '~/store/products/favorite.js';

export function useFavoriteProducts(product) {
    const reactiveFavoriteProduct = ref(false);
    const favoriteProductStore = useFavoriteProductStore();

    function loadFavoriteItems() {
        const favoriteJson = localStorage.getItem('favoriteProducts');
        return favoriteJson ? JSON.parse(favoriteJson) : [];
    }

    function updateFavoriteItems(favoriteItems) {
        localStorage.setItem('favoriteProducts', JSON.stringify(favoriteItems));
        favoriteProductStore.getData();
    }

    function checkIfProductInFavorites() {
        const favoriteItems = loadFavoriteItems();
        return favoriteItems.some(item => item.id === product.id);
    }

    function toggleFavoriteProduct() {
        const favoriteItems = loadFavoriteItems();
        const itemIndex = favoriteItems.findIndex(item => item.id === product.id);
        reactiveFavoriteProduct.value = !reactiveFavoriteProduct.value;
        // console.log(reactiveFavoriteProduct.value);

        if (reactiveFavoriteProduct.value) {
            if (itemIndex === -1) {
                favoriteItems.push(product);
            }
        } else {
            if (itemIndex !== -1) {
                favoriteItems.splice(itemIndex, 1);
            }
        }

        updateFavoriteItems(favoriteItems);
    }

    return {
        reactiveFavoriteProduct,
        toggleFavoriteProduct,
        loadFavoriteItems,
        checkIfProductInFavorites
    };
}
