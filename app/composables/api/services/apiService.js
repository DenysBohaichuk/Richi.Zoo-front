import { ref } from 'vue';
import {useRouter} from 'vue-router'
import { useAuthStore } from "~/store/user/auth.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";

const networkErr = { status: false, error: { message: "Немає з'єднання з сервером." }};
const undefinedErr = { status: false, error: { message: "Невідома помилка." }};

export default function apiService(apiClient) {
    const response = ref(null);
    const data = ref(null);
    const isLoading = ref(false);
     const router = useRouter();
     const authStore = useAuthStore();

    async function requestWithRefresh(requestFn) {
        try {
            return await requestFn();
        } catch (err) {
            console.log(err);
            // якщо 401 – спробуємо оновити токен
            if (err.response?.status === 401 && authStore.refreshToken) {
                try {
                    const r = await apiClient.post('/auth/refresh', {
                        refresh_token: authStore.refreshToken
                    });
                    authStore.setTokens(r.data.access_token, r.data.refresh_token);
                    // повторимо оригінальний запит вже з новим токеном
                    return await requestFn();
                } catch {
                    // якщо refresh не вдався – логаут
                    authStore.logout();
                    router.push({ name: 'login' });
                    return;
                }
            }

            return { status: false, data: null, error: { message: err.response.data.error.message } }
        }
    }


    const fetchData = async (path, headers = {}) => {
        isLoading.value = true;
        try {
            const resp = await requestWithRefresh(() =>
                apiClient.get(path, { headers: headers })
            );
            if (!resp.data?.status) {
                throw resp;
            }

            response.value = resp.data;
            data.value = resp.data;
        } catch (err) {
            console.log(err);
            if (err.message === "Network Error") {
                response.value = networkErr;
            } else {
                response.value = err;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const postData = async (path, payload, headers = {}) => {
        isLoading.value = true;
        try {

            const resp = await requestWithRefresh(() =>
                apiClient.post(path, payload, { headers: headers })
            );
            if (!resp.data?.status) {
                throw resp;
            }

            response.value = resp.data;
            data.value = resp.data;
        } catch (err) {
            console.log('catch')

            if (err.message === "Network Error") {
                response.value = networkErr;
            } else {
                response.value = err;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const updateData = async (path, payload, headers = {}) => {
        isLoading.value = true;
        try {

            const resp = await requestWithRefresh(() =>
                apiClient.put(path, payload, { headers: headers })
            );
            if (!resp.data?.status) {
                throw resp;
            }

            response.value = resp;
            data.value = resp.data;
        } catch (err) {
            if (err.message === "Network Error") {
                response.value = networkErr;
            } else {
                console.log(err)
                response.value = err;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const deleteData = async (path, headers = {}) => {
        isLoading.value = true;
        try {

            const resp = await requestWithRefresh(() =>
                apiClient.delete(path, { headers: headers })
            );
            if (!resp.data?.status) {
                throw resp;
            }

            response.value = resp.data;
            data.value = resp.data;
        } catch (err) {
            if (err.message === "Network Error") {
                response.value = networkErr;
            } else {
                response.value = err;
            }
        } finally {
            isLoading.value = false;
        }
    };

    return { response, data, isLoading, fetchData, postData, updateData, deleteData };
}
