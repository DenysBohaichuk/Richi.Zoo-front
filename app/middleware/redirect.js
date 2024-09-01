import {useProductStore} from "~/store/products/product.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.name === 'index') {
        clearError();
    throw createError({
        statusCode: 404,
        message: 'Сторінку не знайдено!'
    })
}
});
