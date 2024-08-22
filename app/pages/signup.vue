<template>
  <div class="container">
    <div class="relative">
      <UILoaderKakiDog v-show="formSubmitted" :round="'15px'"/>
      <div class="max-w-[500px] h-max bg-white p-5 rounded-[15px]">
        <div class="mb-3 text-xl flex justify-center">Реєстрація</div>
        <form ref="formSignup" @submit.prevent="onSubmit" class="flex flex-col h-full gap-5">
          <!-- Пошта -->
          <div class="relative">
            <UIFieldsEmailField label="Пошта*" name="email" id="email" v-model="emailValue" :error="emailError"/>
          </div>
          <!-- Ім'я -->
          <div class="flex gap-5 w-full flex-col sm:flex-row">
            <div class="sm:w-1/2">
              <UIFieldsInputField label="Ім'я*" id="name" type="text" v-model="nameValue" :error="nameError"/>
            </div>
            <!-- Прізвище -->
            <div class="sm:w-1/2">
              <UIFieldsInputField label="Прізвище" id="surname" type="text" v-model="surnameValue"/>
            </div>
          </div>
          <!-- Телефон -->
          <div>
            <UIFieldsInputField label="Телефон" id="phone" type="tel" v-model="phoneValue"/>
          </div>
          <!-- Пароль та повторення паролю -->
          <div class="flex gap-5 flex-col sm:flex-row">
            <div class="sm:w-1/2">
              <UIFieldsPasswordField label="Пароль*" id="password" type="password" v-model="passValue"
                                     :error="passError"/>
            </div>
            <div class="sm:w-1/2">
              <UIFieldsPasswordField label="Повторити пароль*" id="repeatPassword" type="password"
                                     v-model="repeatPassValue" :error="repeatPassError"/>
            </div>
          </div>
          <div class="flex justify-center items-center flex-col gap-3">
            <UIButtonsSimpleSkyButton :text="'Зареєструватися'"/>
            <span>Або</span>
            <UIButtonsGoogleSignInButton @signInStart="formSubmitted = true" @signInComplete="formSubmitted = false" class="h-8"/>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {useModalInfoStore} from "~/store/modals/info.js";

const formSubmitted = ref(false);
const modalInfoStore = useModalInfoStore();
const formSignup = ref(null);



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
  formSubmitted.value = true; // Позначаємо, що форма була відправлена

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
  formSubmitted.value = false

});


</script>

<style scoped>
</style>
