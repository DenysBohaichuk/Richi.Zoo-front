import { ref } from 'vue';

const networkErr = { status: false, error: { message: "Немає з'єднання з сервером." }};
const undefinedErr = { status: false, error: { message: "Невідома помилка." }};

export default function apiService(apiClient) {
    const response = ref(null);
    const data = ref(null);
    const isLoading = ref(false);

    const fetchData = async (path) => {
        isLoading.value = true;
        try {
            const resp = await apiClient.get(path);
            response.value = resp.data;
            data.value = resp.data;
        } catch (err) {
            console.log(err);
            if (err.message === "Network Error") {
                response.value = networkErr;
            } else {
                response.value = undefinedErr;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const createData = async (path, payload, token = '') => {
        isLoading.value = true;
        try {
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const resp = await apiClient.post(path, payload, { headers });
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

    const updateData = async (path, payload) => {
        isLoading.value = true;
        try {
            const resp = await apiClient.put(path, payload);
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

    const deleteData = async (path) => {
        isLoading.value = true;
        try {
            const resp = await apiClient.delete(path);
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

    return { response, data, isLoading, fetchData, createData, updateData, deleteData };
}
