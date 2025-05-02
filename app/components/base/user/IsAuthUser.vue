<!-- components/IsAuthUser.vue -->
<script setup lang="ts">
import { useAuthStore } from "~/store/user/auth";

const props = defineProps({
  redirectPath: {
    type: String,
    default: '/', // Шлях для редиректу за замовчуванням
  },
  requireAuth: {
    type: Boolean,
    default: true, // If true, requires user to be authenticated; if false, requires user to be unauthenticated
  },
});

const authStore = useAuthStore();
const isReady = ref(false);

onBeforeMount(() => {
  authStore.userData();
  const isLoggedIn = authStore.isLoggedIn;

  // Redirect logic based on requireAuth prop and authentication state
  if (props.requireAuth && !isLoggedIn) {
    navigateTo(props.redirectPath); // Redirect if auth is required but user is not logged in
  } else if (!props.requireAuth && isLoggedIn) {
    navigateTo(props.redirectPath); // Redirect if auth is not required but user is logged in
  }

  isReady.value = true;
});

</script>

<template>
  <div v-if="isReady && (props.requireAuth ? authStore.isLoggedIn : !authStore.isLoggedIn)">
    <slot />
  </div>
  <div v-else>Loading...</div>
</template>