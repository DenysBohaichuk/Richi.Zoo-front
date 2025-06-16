<template>
  <div>
    <ClientOnly>
      <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="text-sm"/>
    </ClientOnly>

    <div v-if="filters.length === 0 && products.length === 0" class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 min-h-screen">
      <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ category.name }}</h2>
      </div>
      <TemplatesSubcategoryList :subcategories="subcategories"/>
    </div>
    <div v-else class="">
      <div class="">
        <TemplatesProductsListView :category="category" :products="products" :pagination="pagination" :filters="filters"/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {getDataFromStore} from "~/mixins/MixinCategoriesAndProducts";
import {useCategoryStore} from "~/store/categories/category";


definePageMeta({
  middleware: ['get-categories'],
});

const breadcrumbs = ref([]);
const products = ref([]);
const pagination = ref([]);
const filters = ref([]);
const category = ref([]);
const subcategories = ref([]);


onMounted(async () => {
    const data = await getDataFromStore();
    breadcrumbs.value = data.breadcrumbs;
    products.value = data.products;
    pagination.value = data.pagination;
    filters.value = data.filters;
    category.value = data.category;
    subcategories.value = data.subcategories;



  watch(() => useCategoryStore().categoryData, async () => {
    const data = await getDataFromStore();
    products.value = data.products;
    pagination.value = data.pagination;
  });
})

</script>
