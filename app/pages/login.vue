<template>
  <LazyBaseUserIsAuthUser>
    <div class="container">
      <div class="relative">
        <UILoaderKakiDog v-show="formSubmitted" :round="'15px'"/>
        <div class="w-[400px] h-max bg-white p-5 rounded-[15px]">
          <div class="mb-3 text-xl flex justify-center">Авторизація</div>
          <form ref="formLogin" @submit.prevent="onSubmit" class="flex flex-col h-full gap-5">

            <!--   Пошта    -->
            <div>
              <div class="relative">
                <UIFieldsEmailField label="Пошта*" name="email" id="email" v-model="emailValue" :error="emailError"/>
              </div>
            </div>

            <div>
              <!--Пароль-->
              <div class="relative">
                <UIFieldsPasswordField label="Пароль*" id="password" type="password" v-model="passValue"
                                       :error="passError"/>
              </div>
            </div>

            <!--        Кнопка авторизації-->
            <div class="flex justify-center items-center flex-col gap-3">
              <button type="submit"
                      class="rounded-[15px] bg-azure hover:bg-сerulean w-max py-[7px] px-[21px] text-white">
                Вхід
              </button>
              <span>Або</span>
              <UIButtonsGoogleSignInButton @signInStart="formSubmitted = true" @signInComplete="formSubmitted = false" class="h-8"/>
            </div>

          </form>
        </div>
      </div>
    </div>
  </LazyBaseUserIsAuthUser>
</template>

<script setup>


import {useModalInfoStore} from "~/store/modals/info.js";
import {ref} from 'vue';
import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import GoogleSignInButton from "~/components/UI/buttons/GoogleSignInButton.vue";

const modalInfoStore = useModalInfoStore();
const formSubmitted = ref(false);
const formLogin = ref(null);


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
  formSubmitted.value = true;

  const payload = {
    email: emailValue.value,
    password: passValue.value
  };
  let responseLogin = await apiMethods.login(payload);

  if (responseLogin.status) {
    await navigateTo('/');
  } else {
    modalInfoStore.openModal(responseLogin.status, await responseMessages.getMessage(responseLogin))
    passValue.value = '';
  }

  formSubmitted.value = false;
});

</script>
