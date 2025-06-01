import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from '~/composables/api/responses/responseFormat.js';
import getApiService from "~/composables/api/services/getApiService.js";

class AuthService {
    async signup(user) {
        const { response, postData } = getApiService();

        await postData(apiPath.signup, {
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            password: user.password || null,
        });
        return responseFormat.response(response.value);
    }

    async login(user) {
        const { response, postData } = getApiService();

        await postData(
            apiPath.login,
            {
                email: user.email,
                password: user.password || null,
            });

        return responseFormat.response(response.value);
    }

    async googleAuth(user) {
        const { response, postData } = getApiService();

        await postData(apiPath.google, {}, user.GISToken ? { 'GISToken': user.GISToken } : null);
        return responseFormat.response(response.value);
    }
}

export default new AuthService();