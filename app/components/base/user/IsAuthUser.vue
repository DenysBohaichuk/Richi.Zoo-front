<!--
Компонент який відображає контент якщо користувач НЕ авторизований
-->

<script setup lang="ts">
import {useAuthStore} from "~/store/user/auth";

const authStore = useAuthStore();
onBeforeMount(()=>{
  authStore.userStatus();

  if (authStore.isLoggedIn) {
    navigateTo('/');
  }

})

</script>

<template>
  <div v-show="!authStore.isLoggedIn">
    <slot/>
  </div>
</template>
