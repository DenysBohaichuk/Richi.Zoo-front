<template>
  <BaseLayoutsMainLayoutWrapper templateClass="w-full">
    <template #main-content>
      <div class="auth-wrapper">
        <BaseLoaderKakiDog v-show="formSubmitted" :round="'15px'" />
        <div class="auth-container">
          <slot />
        </div>
      </div>
    </template>
  </BaseLayoutsMainLayoutWrapper>
</template>


<script setup>

import {useLoading} from "~/composables/auth/useLoading.js";

const { formSubmitted } = useLoading()
</script>

<style scoped>


/* Додаємо обгортку з фіксованим позиціонуванням для гарантованого центрування */
.auth-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-container {
  width: 100%;
  max-width: 400px; /* Максимальна ширина форми */
  background: white;
  padding: 20px; /* Відступи всередині попапа */
  border-radius: 15px; /* Заокруглені кути */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тінь */
}

/* Мобільна версія (екрани до 640px) */
@media (max-width: 640px) {
  .auth-wrapper {
    position: relative; /* Залишаємо фіксоване позиціонування для центрування */
    display: flex;
    justify-content: center;
    align-items: center; /* Центруємо по вертикалі */
    padding: 0;
    margin-bottom: 90px;
  }

  .auth-container {
    max-width: 100%; /* Форма займає всю ширину */
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Центруємо вміст форми по вертикалі */
    border-radius: 15px; /* Заокруглені кути */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тінь */
  }
}
</style>