<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">

      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3  lg:gap-x-8 xl:grid-cols-5">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>
  </div>


<!--  <div class="bg-white">
    <div class="mx-auto max-w-7xl overflow-hidden p-4 md:px-8">
      <h2 class="sr-only">Products</h2>
        <div class="-mx-px product-grid grid grid-cols-1 border-l border-gray-200 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

      </div>
    </div>
  </div>-->
</template>

<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  products: Array
});
</script>

<style>
@import '@/assets/css/pages/products.css';

</style>
