/**
 * Клас який який робить звернення до API з завчасно виставленими параметрами
 */

import apiPath from '~/composables/api/endpoints/apiPaths.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";
import apiService from "~/composables/api/services/apiService.js";

const { response, fetchData,  createData } = apiService();

class AuthService {
    async signup(user) {
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
        await fetchData(apiPath.verify_email + token);
        return responseFormat.response(response.value);
    }

    async login(user) {
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
