const apiPaths = {
    google: '/auth/google',
    signup: '/auth/signup',
    verify_email: '/auth.vue/verify-email?token=',
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/token/refresh',
    me: '/auth/me',

    category: '/categories/get-category/', //and add slug
    categories: '/categories/get-list-categories',

    products: '/products/get-product',
    search_product: '/products/search-product',

    delivery_methods: '/delivery-methods',

    create_order: '/create-order',

    user: '/user',
    userAvatar: '/user/avatar',
    userPassword: '/user/password',

    page_content: '/pages/', //and add slug
};

export default apiPaths;