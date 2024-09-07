<template>
  <nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
      <!-- Головна сторінка -->
      <li class="flex">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </NuxtLink>
        </div>
      </li>

      <!-- Хлібні крихти -->
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="flex">
        <div class="flex items-center">
          <!-- Стрілка між крихтами -->
          <svg class="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>

          <!-- Посилання для кожної крихти -->
          <NuxtLink
              v-if="breadcrumb.url !== currentUrl"
              :to="breadcrumb.url"
              class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ breadcrumb.name }}
          </NuxtLink>
          <span v-else class="ml-4 text-sm font-medium text-сerulean font-bold">
            {{ breadcrumb.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { HomeIcon } from '@heroicons/vue/20/solid';

// Приймаємо breadcrumbs як пропс
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true
  }
});

// Поточний URL сторінки
const currentUrl = ref(window.location.pathname);
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
}

.breadcrumb-item {
  margin-right: 5px;
}
</style>
