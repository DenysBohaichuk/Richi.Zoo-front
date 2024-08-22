/**
 * Методи для роботи з апі
 *
 * Простий спосіб звернутися до будь якого методу
 */
import {authModule} from "~~/server/services/user/auth/authModule.js";
import {categoryService} from "~~/server/services/category/categoryService.js";
import {productService} from "~~/server/services/product/productService.js";

export const apiMethods = {
    /**
     * Реєстрація
     */
      async signup (userData){
        return await authModule.signup(userData);
        },

    /**
     * Підтвердження пошти
     */
    async verifyEmail (token){
        return await authModule.verifyEmail(token);
    },

    /**
     * Авторизація
     */
    async login (userData){
        return await authModule.login(userData);
    },

    /**
     * Отримання категорії
     */
    async getCategory(slug){
        return await categoryService.getCategory(slug);
    },

    /**
     * Отримання списка категорій
     */
    async getListCategories(){
        return await categoryService.getListCategories();
    },

    /**
     * Отримання товару
     */
    async getProduct(id){
        return await productService.getProduct(id);
    },

    /**
     * Отримання товарів по пошуку
     */
    async getProductsBySearch(query){
        return await productService.getProductsBySearch(query);
    }
}