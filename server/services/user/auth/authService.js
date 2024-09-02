/**
 * Клас який який робить звернення до API з завчасно виставленими параметрами
 */

import getApiService from '~~/server/api/getApiService.js';
import apiPath from '~~/server/endpoints/apiPaths.js';
import { responseFormat } from "~~/server/api/responses/responseFormat.js";

class AuthService {
    async signup(user) {
        const { response, createData } = getApiService();
        await createData(apiPath.signup, {
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            isGIS: user.gis,
            password_hash: user.password
        });
        return responseFormat.response(response.value);
    }

    async verifyEmail(token) {
        const { response, fetchData } = getApiService();
        await fetchData(apiPath.verify_email + token);
        return responseFormat.response(response.value);
    }

    async login(user) {
        const { response, createData } = getApiService();
        await createData(apiPath.login, {
            email: user.email,
            password_hash: user.password,
            isGIS: user.gis,
        }, user.GISToken);

        let resp = responseFormat.response(response.value);
        if (resp.status) {
            localStorage.setItem('user', JSON.stringify(resp.data.token));
        }
        return resp;
    }
}

export default new AuthService();
