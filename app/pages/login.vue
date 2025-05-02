<template>
  <BaseUserIsAuthUser :requireAuth="false">
    <div class="relative">
      <div class="mb-5 text-xl font-semibold text-center">{{ $t('auth.login.title') }}</div>
      <form ref="formLogin" @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <!-- Пошта -->
        <div>
          <BaseFieldsEmailField :label="$t('auth.login.email')" name="email" id="email" v-model="emailValue" :error="emailError" />
        </div>

        <!-- Пароль -->
        <div>
          <BaseFieldsPasswordField :label="$t('auth.login.password')" id="password" type="password" v-model="passValue" :error="passError" />
        </div>

        <!-- Кнопка авторизації -->
        <div class="flex flex-col items-center gap-4">
          <BaseButtonsSimpleSkyButton :text="$t('auth.login.login_button')" class="min-w-[170px]"></BaseButtonsSimpleSkyButton>
<!--          <button type="submit" class="w-full max-w-[200px] py-2 px-6 text-white bg-azure hover:bg-cerulean rounded-[15px]">
            Вхід
          </button>-->
          <span class="text-gray-500 text-sm">{{ $t('auth.another_auth') }}</span>
          <BaseButtonsGoogleSignInButton @signInStart="formSubmitted = true" @signInComplete="formSubmitted = false" class="h-8" />
          <NuxtLink to="/signup" class="text-sm text-azure hover:underline">
            {{ $t('auth.login.register_link') }}
          </NuxtLink>
        </div>
      </form>
    </div>
  </BaseUserIsAuthUser>
</template>

<script setup>

definePageMeta({
  layout: 'auth',
});

import { ref } from 'vue';
import {useLoading} from "~/composables/auth/useLoading.js";
import {useModalInfoStore} from "~/store/modals/info.js";
import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {apiMethods} from "~/composables/api/methods/apiMethods.js";
import {responseFormat} from "~/composables/api/responses/responseFormat.js";

const modalInfoStore = useModalInfoStore();
const formLogin = ref(null);
const { formSubmitted, setLoading } = useLoading()

const startLoading = () => setLoading(true)
const stopLoading = () => setLoading(false)

// Визначаємо схему валідації
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

// Ініціалізація useForm з валідаційною схемою
const {handleSubmit, errors} = useForm({
  validationSchema: schema,
});

const {value: emailValue, errorMessage: emailError} = useField('email', schema.fields.email);
const {value: passValue, errorMessage: passError} = useField('password', schema.fields.password);


const onSubmit = handleSubmit(async () => {
  startLoading();

  const payload = {
    email: emailValue.value,
    password: passValue.value
  };
  let responseLogin = await apiMethods.login(payload);

  if (responseLogin.status) {
    await navigateTo('/');
  } else {
    modalInfoStore.openModal(responseLogin.status, await responseFormat.response(responseLogin.error.message))
    passValue.value = '';
  }

  stopLoading();
});

</script>
<style scoped>

</style>