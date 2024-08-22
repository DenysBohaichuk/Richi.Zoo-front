<template>
  <div class="w-full">
    <div class="bg-white">

      <div v-if="data.products.length === 0" class="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ data.category.name }}</h2>
        </div>
        <TemplatesSubcategoryList :subcategories="data.subcategories" />
      </div>
      <div v-else class="">
       <div class="">
         <TemplatesProductsListView :category="data.category" :products="data.products"/>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup  lang="ts">
import {getDataFromStore} from "~/mixins/MixinCategoriesAndProducts";

definePageMeta({
  middleware: ['get-categories'],
});

const data = await getDataFromStore();
onMounted(()=>{
  data.products.length > 0 ? setPageLayout('products') : setPageLayout('default');
})
</script>
