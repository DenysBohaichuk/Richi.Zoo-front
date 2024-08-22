export default defineNuxtRouteMiddleware( (to, from) => {
    if (to.path.startsWith('/verify-email')) {
        const token = to.query.token;
        if (!token) {
            clearError();
            throw createError({
                statusCode: 404,
                message: 'Сторінку не знайдено!'
            })
        }
    }
});