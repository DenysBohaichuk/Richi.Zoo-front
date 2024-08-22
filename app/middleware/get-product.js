import { useProductStore } from "~/store/products/product.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const productId = to.params.id; // Отримайте ID продукту з параметрів URL

    try {
        const productStore = useProductStore();
        await productStore.getProductData(productId);
        const productData = productStore.productData;
        if (!productData) {
            throw createError({
                statusCode: 404,
                message: 'Товар не знайдено!'
            });
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw createError({
            statusCode: 404,
            message: error.message || 'Товар не знайдено!'
        });
    }
});
