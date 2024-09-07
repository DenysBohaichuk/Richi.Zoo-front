import {useCategoryStore} from "~/store/categories/category.js";

export async function getDataFromStore(){
    const data = await useCategoryStore().categoryData.data
    const category = data.category
    const subcategories = data.subcategories
    const products = data.products
    const breadcrumbs = data.breadcrumbs

    return {
        category,
        subcategories,
        products,
        breadcrumbs
    }
}