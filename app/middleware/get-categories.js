import {useCategoryStore} from "~/store/categories/category.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const categorySlug = to.params.slug.join("/"); // Отримайте slug з параметрів URL
    const queryString = new URLSearchParams(to.query).toString();

    const url = categorySlug + (queryString ? '?' + queryString : '');

    try {
        await useCategoryStore().getCategoryData(url);
        const categoryData = await useCategoryStore().categoryData;

        if (!categoryData.status) {
            clearError();
            throw createError({
                statusCode: 404,
                message: categoryData.error.message || 'Сторінку не знайдено!'
            })
        }
    } catch (error) {
        console.log(error)

        clearError();
        throw createError({
            statusCode: 404,
            message: error.message || 'Сторінку не знайдено!'
        })
    }
});