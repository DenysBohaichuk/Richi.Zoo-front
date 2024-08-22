// mixins/MixinCommon.js - as a composable function
import {ref} from 'vue'

//open-close sidebar
export function useToggle() {
    const open = ref(false)
    const toggleSlideOver = () => {
        open.value = !open.value
    }

    return {open, toggleSlideOver}
}

//Preloader
export function useLoading() {
    const waitLoadPage = ref(true);

    onMounted(() => {
        waitLoadPage.value = false;
        return {waitLoadPage};
    });
  return {waitLoadPage};
}
