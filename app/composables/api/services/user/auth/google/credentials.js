import { ref } from 'vue';
import { parseJwt } from '~/utils/jwt.js';
import { useModalInfoStore } from '~/store/modals/info.js';
import { authModule } from '~/composables/api/services/user/auth/authModule.js';
import { responseFormat } from "~/composables/api/responses/responseFormat.js";

export default function useAuth() {
    const user = ref(null);
    const errorMessage = ref('');
    const modalInfoStore = useModalInfoStore();

    const handleCredentialResponse = async (response) => {


        const responsePayload = parseJwt(response.credential);

        if (!responsePayload) {
            errorMessage.value = 'Помилка декодування Google JWT';
            return { success: false };
        }

            user.value = {
                email: responsePayload.email,
                google_id: responsePayload.sub, // Google ID
                name: responsePayload.given_name,
                surname: responsePayload.family_name,
                gis: true, // Залишаємо для сумісності
                GISToken: response.credential, // JWT токен від Google
            };

            const responseAuth = await authModule.googleAuth(user.value);

            if (!responseAuth.status) {
                await modalInfoStore.openModal(
                    responseAuth.status,
                    await responseFormat.response(responseAuth.error.message)
                );
            }
            return { success: responseAuth.status };


    };

    return { user, errorMessage, handleCredentialResponse };
}