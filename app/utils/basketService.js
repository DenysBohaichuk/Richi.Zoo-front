import { useProductsBasket } from "~/composables/products/basketHandler.js";
import { useProductBasketStore } from "~/store/modals/basket.js";

export function removeFromBasket(product) {
    const { removeProductFromBasket } = useProductsBasket(product);
    removeProductFromBasket();
}

export function saveBasketToLocalStorage(products) {
    useProductBasketStore().setData(products);
}

export function computeFeatureTypes(product) {
    const types = {};
    product.product_features.forEach(feature => {
        if (feature.pivot.is_selected === 1) {
            const typeName = feature.feature_type.name;
            if (!types[typeName]) {
                types[typeName] = { id: feature.feature_type.id, name: typeName, value: '' };
            }
            types[typeName].value += feature.value;
        }
    });
    return Object.values(types);
}

export function calculateTotalAmount(products) {
    if (!products || products.length === 0) {
        return '0.00'; // Повертаємо нульову суму, якщо масив товарів пустий або не визначений
    }

    return products.reduce((total, product) => {
        const quantity = product.quantity ? parseInt(product.quantity, 10) : 1;
        return total + (product.price * quantity);
    }, 0).toFixed(2);
}
