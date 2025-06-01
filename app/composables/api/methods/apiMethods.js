/**
 * Методи для роботи з апі
 *
 * Простий спосіб звернутися до будь якого методу
 */
import {authModule} from "~/composables/api/services/user/auth/authModule.js";
import {categoryService} from "~/composables/api/services/category/categoryService.js";
import {productService} from "~/composables/api/services/product/productService.js";
import {deliveryMethodsService} from "~/composables/api/services/delivery_methods/deliveryMethodsService.js";
import {orderService} from "~/composables/api/services/orders/orderService.js";
import {userService} from "~/composables/api/services/user/userService.js";
import {pageService} from "~/composables/api/services/pages/pageService.js";

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
    },

    /**
     * Отримання методів доставки
     */
    async getDeliveryMethods(){
        return await deliveryMethodsService.getDeliveryMethods();
    },

    /**
     * Створення замовлення
     */
    async createOrder(payload){
        return await orderService.createOrder(payload);
    },

    /**
     * Отримати дані юзера
     */
    async getProfile(){
        return await userService.getProfile();
    },

    /**
     * Отримання контенту для сторінки
     */
    async getPageContent(slug){
        return await pageService.getContent(slug);
    },
}