<script setup lang="ts">/*
definePageMeta({
  middleware: ["verify-email-redirect"]
})


import {apiMethods, responseMessages} from "~/composables";
import {ref} from "vue";

const waitLoadData = ref(true);
const resp = reactive({
  status: true,
  message: '',
});

onMounted(async () => {
const route = useRoute();
  if (route.query.token) {
    const response = await apiMethods.verifyEmail(route.query.token);
    resp.message = await responseMessages.getMessage(response);
    if(!response.status){
      resp.status = false;
    }
    waitLoadData.value = false;
  }
});
*/</script>

<template>
  <div class="container">
<!--    <div class="relative">
      <BaseLoaderKakiDog v-show="waitLoadData" :round="'15px'"/>
      <div class="max-w-[500px] h-max bg-white p-5 rounded-[15px] text-center">
        <div class="mb-3 text-xl flex justify-center">Підтвердження аккаунта</div>
        <div>
          <p :class="[resp.status ? 'text-green-400': 'text-red-400']" class="mt-6 text-base leading-7 text-gray-600">{{resp.message}}</p>
        </div>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink to="/" class="rounded-[15px] bg-azure hover:bg-сerulean w-max py-[7px] px-[21px] text-white">
              Повернутися на головну сторінку
            </NuxtLink>
            <NuxtLink v-if="resp.status" to="/login" class="rounded-[15px] bg-azure hover:bg-сerulean w-max py-[7px] px-[21px] text-white">
              Авторизуватися
            </NuxtLink>
            <NuxtLink v-else to="/support" class="rounded-[15px] bg-azure hover:bg-сerulean w-max py-[7px] px-[21px] text-white">
              Підтримка
            </NuxtLink>
          </div>
      </div>
    </div>-->
  </div>

</template>

<style scoped>

</style>