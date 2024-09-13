import {useNavbarStore} from "~/store/components/navbar.js";

export async function getDataFromStore(){
    const categoriesDropdown = await useNavbarStore().categoriesDropdown.data;

    return {
        categoriesDropdown
    }
}