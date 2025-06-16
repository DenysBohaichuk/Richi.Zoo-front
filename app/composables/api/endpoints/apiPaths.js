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
    getProductComments: (id) => `/products/${id}/comments`,
    postProductComment: (id) => `/products/${id}/comments`,
    get_reviews: `/user/comments`,

    delivery_methods: '/delivery-methods',

    create_order: '/create-order',

    user: '/user',
    user_avatar: '/user/avatar',
    user_password: '/user/password',

    page_content: '/pages/', //and add slug

    payment: (orderId) => `/payment/checkout/${orderId}`
};

export default apiPaths;