import {ref} from 'vue'
import {parseJwt} from '~/utils/jwt.js'
import {useModalInfoStore} from '~/store/modals/info.js';

export default function useAuth() {
    const user = ref(null)
    const errorMessage = ref("")
    const modalInfoStore = useModalInfoStore();

    const handleCredentialResponse = async (response) => {
        const responsePayload = parseJwt(response.credential);
        if (responsePayload) {
            user.value = {
                email: responsePayload.email,
                id: responsePayload.sub,
                name: responsePayload.given_name,
                surname: responsePayload.family_name,
                gis: true,
                GISToken: response.credential,
            };

            let responseAuth = await apiMethods.login(user.value);

            if (!responseAuth.status)
                modalInfoStore.openModal(responseAuth.status, await responseMessages.getMessage(responseAuth));
            else
                navigateTo('/');
        } else {
            errorMessage.value = "Error decoding JWT";
        }
    }

    return {user, errorMessage, handleCredentialResponse}
}