<template>
  <NuxtLink :to="`/product/${product.id}`" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div class="relative aspect-h-4 aspect-w-3 bg-white sm:aspect-none group-hover:opacity-75 sm:h-64">
      <NuxtImg :src="product.images[0]" alt="Image"
               class="h-full w-full object-cover object-center sm:h-full sm:w-full "/>
      <div class="absolute inset-x-0 top-0 image-shadow flex h-64 items-end justify-end overflow-hidden ">
        <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-30"/>
      </div>
      <div
          class="absolute bottom-0 right-0 m-1 bg-slate-200/70 rounded-full hover:scale-125 transition duration-700 ease-in-out">
        <button @click.prevent="toggleFavoriteProduct" class="p-2">
          <transition name="fade" mode="out-in" class="relative w-6 h-6">
            <HeartOutlineIcon v-if="!reactiveFavoriteProduct" key="outline" class="w-6 h-6 text-red-500 absolute "/>
            <HeartSolidIcon v-else key="solid" class="w-6 h-6 text-red-500 absolute"/>
          </transition>
        </button>
      </div>
    </div>
    <div class="flex justify-between flex-col gap-3 p-2 pt-0">
      <span class="flex justify-end text-xs text-gray-600">
          {{ product.barcode ? $t('product.art') + ':\u00A0' + product.barcode : '\u00A0' }}
      </span>
      <h3 class="text-center text-sm font-medium text-gray-900">
        <a href="#">
          {{ product.name }}
        </a>
        <p class="text-center mt-1 text-base font-medium text-gray-900">{{ product.price }} грн</p>
      </h3>
      <div class="flex">
        <UIButtonsSimpleSkyButton class="!w-full" :text="$t('product.buy_button')" @click.prevent="addProductToBasket();openModal() "/>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import {HeartIcon as HeartOutlineIcon} from "@heroicons/vue/24/outline";
import {HeartIcon as HeartSolidIcon} from "@heroicons/vue/24/solid";
import {useProductsBasket} from "~/composables/products/basketHandler.js";
import {useProductBasketStore} from "~/store/modals/basket.js";

const props = defineProps({
  product: Object
});
const product = reactive(props.product);
product.quantity = 1;

const {reactiveFavoriteProduct, toggleFavoriteProduct, loadFavoriteItems} = useFavoriteProducts(props.product);

function setIconStateFromStorage() {
  const cartItems = loadFavoriteItems();
  const productInCart = cartItems.find(item => item.id === props.product.id);
  reactiveFavoriteProduct.value = !!productInCart;
}

onMounted(() => {
  setIconStateFromStorage();
});


const {addProductToBasket} = useProductsBasket(props.product);
const { openModal } = useProductBasketStore();


</script>

<style scoped>
/* Задайте стилі для "enter" і "leave" анімацій */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

/* Визначте початковий стан для елемента, який з'являється */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Визначте кінцевий стан для елемента, який з'являється */
.fade-enter-to {
  opacity: 1;
}


</style>
