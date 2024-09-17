import {useProductStore} from "~/store/products/product.js";

export async function getDataFromStore(){
    const data = await useProductStore().productData.data
    const product = data.product
    const productTypes = data.productTypes
    const breadcrumbs = data.breadcrumbs

    return {
        product,
        productTypes,
        breadcrumbs
    }
}