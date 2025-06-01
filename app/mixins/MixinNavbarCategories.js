import {useNavbarStore} from "~/store/components/navbar.js";

export async function getDataFromStore(){

    const navbarStore = useNavbarStore()

    // 1) trigger the fetch
    if (!false) {
        try {
            await navbarStore.getCategoriesDropdown();
        } catch (e) {
            console.error('getCategoriesDropdown упало:', e);
        }
    }
    //await navbarStore.getCategoriesDropdown()

    // 2) safely grab the array (fall back to empty if something went wrong)
    const categoriesDropdown = navbarStore.categoriesDropdown?.data || []

    return {
        categoriesDropdown
    }
}