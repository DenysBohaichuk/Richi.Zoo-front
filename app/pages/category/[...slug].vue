<template>
  <div class="w-full">
    <div class="bg-white">

      <ClientOnly>
        <BaseBreadcrumbs :breadcrumbs="data.breadcrumbs" />
      </ClientOnly>

      <div v-if="data.products.length === 0" class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 min-h-screen">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ data.category.name }}</h2>
        </div>
        <TemplatesSubcategoryList :subcategories="data.subcategories"/>
      </div>
      <div v-else class="">
        <div class="">
          <TemplatesProductsListView :category="data.category" :products="data.products"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {HomeIcon} from '@heroicons/vue/20/solid';
import {getDataFromStore} from "~/mixins/MixinCategoriesAndProducts";
import {onBeforeMount} from "vue";
import {setPageLayout} from "#app";

definePageMeta({
  middleware: ['get-categories'],
});

const breadcrumbs = ref([]);

const data = await getDataFromStore();
onMounted(() => {
  breadcrumbs.value = data.breadcrumbs; // Присвоюємо хлібні крихти реактивній змінній
})

</script>
