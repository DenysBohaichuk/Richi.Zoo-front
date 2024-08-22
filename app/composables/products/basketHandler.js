// composables/useBasketProducts.js

import { ref } from 'vue';
import { useProductBasketStore } from '~/store/modals/basket.js';

export function useProductsBasket(product) {
    const productBasketStore = useProductBasketStore();

    function loadBasketItems() {
        const basketJson = localStorage.getItem('productBasket');
        return basketJson ? JSON.parse(basketJson) : [];
    }

    function updateBasketItems(basketItems) {
        localStorage.setItem('productBasket', JSON.stringify(basketItems));
        productBasketStore.getData();
    }

    function checkIfProductInBasket() {
        const basketItems = loadBasketItems();
        return basketItems.some(item => item.id === product.id);
    }

    function addProductToBasket() {
        const basketItems = loadBasketItems();
        const itemIndex = basketItems.findIndex(item => item.id === product.id);

        if (itemIndex === -1) {
            basketItems.push(product);
            updateBasketItems(basketItems);
        }
    }

    function removeProductFromBasket() {
        const basketItems = loadBasketItems();
        const itemIndex = basketItems.findIndex(item => item.id === product.id);

        if (itemIndex !== -1) {
            basketItems.splice(itemIndex, 1);
            updateBasketItems(basketItems);
        }
    }

    return {
        addProductToBasket,
        removeProductFromBasket,
        loadBasketItems,
        checkIfProductInBasket
    };
}
