<script setup lang="ts">
import { computed, ref, watch, onBeforeMount } from 'vue'
import { useAuthStore } from '~/store/user/auth'
import { navigateTo } from '#app'

const props = defineProps({
  redirectPath: { type: String, default: '/' },
  requireAuth:   { type: Boolean, default: true },
})

const authStore = useAuthStore()
const isReady = ref(false)

onBeforeMount(async () => {
  if (!authStore.isLoggedIn){
  await authStore.init()
  }
  isReady.value = true
})

// Редірект (якщо потрібно)
watch(
    [() => authStore.isLoggedIn, () => isReady.value],
    ([logged, ready]) => {
      if (!ready) return; // чекаємо завершення init()

      console.log('redirect component')
      if (props.requireAuth && !logged) {
        navigateTo(props.redirectPath)
      } else if (!props.requireAuth && logged) {
        navigateTo(props.redirectPath)
      }
    },
    { immediate: true }
)

const canShowSlot = computed(() =>
    props.requireAuth
        ? authStore.isLoggedIn
        : !authStore.isLoggedIn
)
</script>

<template>
  <!-- Поки не isReady — показуємо завантаження -->
  <div v-if="!isReady">Loading...</div>

  <!-- Коли готові — тримаємо в DOM і слот, і фолбек -->
  <div v-else>
    <!-- Сама форма: накопичуємо слот, але ховаємо через CSS -->
    <div v-show="canShowSlot">
      <slot />
    </div>
    <!-- Фолбек-стан, коли умова false -->
    <div v-show="!canShowSlot">
      Loading...
    </div>
  </div>
</template>
