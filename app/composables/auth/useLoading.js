// composables/useLoading.js
import { ref } from 'vue'

const formSubmitted = ref(false)

export function useLoading() {
    return {
        formSubmitted,
        setLoading: (value) => (formSubmitted.value = value),
    }
}