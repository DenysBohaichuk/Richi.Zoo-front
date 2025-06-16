import {useCategoryStore} from "~/store/categories/category.js";

export async function getDataFromStore(){
    const data = await useCategoryStore().categoryData.data
    const category = data.category
    const subcategories = data.subcategories
    const products = data.products
    const pagination = data.pagination
    const filters = data.filters
    const breadcrumbs = data.breadcrumbs

    return {
        category,
        subcategories,
        products,
        pagination,
        filters,
        breadcrumbs
    }
}