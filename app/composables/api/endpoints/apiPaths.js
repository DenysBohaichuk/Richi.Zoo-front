const apiPaths = {
    signup: '/auth/signup',
    verify_email: '/auth/verify-email?token=',
    login: '/auth/login',

    category: '/categories/get-category/',
    categories: '/categories/get-list-categories',

    products: '/products/get-product',
    search_product: '/products/search-product',

    delivery_methods: '/delivery-methods',

    create_order: '/create-order'
};

export default apiPaths;