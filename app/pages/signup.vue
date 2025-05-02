<template>
  <BaseUserIsAuthUser  :requireAuth="false">
    <div class="relative">
      <div class="mb-5 text-xl font-semibold text-center">{{ $t('auth.signup.title') }}</div>
      <form ref="formSignup" @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <!-- Пошта -->
        <div>
          <BaseFieldsEmailField :label="$t('auth.login.email')" name="email" id="email" v-model="emailValue" :error="emailError" />
        </div>

        <!-- Ім'я та Прізвище -->
        <div class="flex gap-5 flex-col sm:flex-row">
          <div class="sm:w-1/2">
            <BaseFieldsInputField :label="$t('auth.signup.name')" id="name" type="text" v-model="nameValue" :error="nameError" />
          </div>
          <div class="sm:w-1/2">
            <BaseFieldsInputField :label="$t('auth.signup.surname')" id="surname" type="text" v-model="surnameValue" />
          </div>
        </div>

        <!-- Телефон -->
        <div>
          <BaseFieldsInputField :label="$t('auth.signup.phone')" id="phone" type="tel" v-model="phoneValue" />
        </div>

        <!-- Пароль та повторення паролю -->
        <div class="flex gap-5 flex-col sm:flex-row">
          <div class="sm:w-1/2">
            <BaseFieldsPasswordField :label="$t('auth.signup.password')" id="password" type="password" v-model="passValue" :error="passError" />
          </div>
          <div class="sm:w-1/2">
            <BaseFieldsPasswordField :label="$t('auth.signup.confirm_password')" id="repeatPassword" type="password" v-model="repeatPassValue" :error="repeatPassError" />
          </div>
        </div>

        <!-- Кнопка реєстрації -->
        <div class="flex flex-col items-center gap-4">
          <BaseButtonsSimpleSkyButton :text="$t('auth.signup.register_button')" class="min-w-[170px]"></BaseButtonsSimpleSkyButton>

          <span class="text-gray-500 text-sm">{{ $t('auth.another_auth') }}</span>

          <BaseButtonsGoogleSignInButton @signInStart="formSubmitted = true" @signInComplete="formSubmitted = false" class="h-8" />
        </div>
      </form>
    </div>
  </BaseUserIsAuthUser>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
});

import {useLoading} from "~/composables/auth/useLoading.js";
import {ref} from 'vue';
import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {useModalInfoStore} from "~/store/modals/info.js";

const modalInfoStore = useModalInfoStore();
const formSignup = ref(null);
const { formSubmitted, setLoading } = useLoading()

const startLoading = () => setLoading(true)
const stopLoading = () => setLoading(false)

// Визначаємо схему валідації
const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required()
});

// Ініціалізація useForm з валідаційною схемою
const {handleSubmit, errors} = useForm({
  validationSchema: schema,
});

// Ініціалізація полів форми
const {value: emailValue, errorMessage: emailError} = useField('email', schema.fields.email);
const {value: nameValue, errorMessage: nameError} = useField('name', schema.fields.name);
const {value: surnameValue, errorMessage: surnameError} = useField('surname', yup.string().nullable());
const {value: phoneValue, errorMessage: phoneError} = useField('phone', yup.string().nullable());
const {value: passValue, errorMessage: passError} = useField('password', schema.fields.password);
const {value: repeatPassValue, errorMessage: repeatPassError} = useField('repeatPassword', schema.fields.repeatPassword);

// Обробник відправки форми
const onSubmit = handleSubmit(async () => {
  startLoading();

  const payload = {
    email: emailValue.value,
    name: nameValue.value,
    surname: surnameValue.value,
    phone: phoneValue.value,
    password: passValue.value
  };

  let responseSignup = await apiMethods.signup(payload);

  modalInfoStore.openModal(responseSignup.status, await responseMessages.getMessage(responseSignup));


  if (responseSignup.status) {
    formSignup.value.reset();
  } else {
    passValue.value = '';
    repeatPassValue.value = '';
  }

  stopLoading();
});


</script>

<style scoped>
</style>
