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
     * Отримати коментарі товару
     */
    async getProductComments(id){
        return await productService.getProductComments(id)
    },

    /**
     * Створення коментаря товару
     */
    async postProductComments(id, payload){
        return await productService.postProductComments(id, payload)
    },

    /**
     * Створення коментаря товару
     */
    async getUserComments(){
        return await userService.getReviews()
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
     * Створення замовлення
     */
    async getUserOrders(){
        return await orderService.getOrders();
    },

    /**
     * Отримати дані юзера
     */
    async getProfile(){
        return await userService.getProfile();
    },

    /**
     * Оновити профіль юзера
     */
    async updateProfile(payload){
        return await userService.updateProfile(payload);
    },

    /**
     * Оновити аватар юзера
     */
    async uploadAvatar(payload){
        return await userService.uploadAvatar(payload);
    },

    /**
     * Оновити пароль юзера
     */
    async changePassword(payload){
        console.log(await userService.changePassword(payload))
        return await userService.changePassword(payload);
    },

    /**
     * Отримання контенту для сторінки
     */
    async getPageContent(slug){
        return await pageService.getContent(slug);
    },

    /**
     * Оплата замовлення
     */
    async payment(orderId){
        return await orderService.payment(orderId);
    },
}