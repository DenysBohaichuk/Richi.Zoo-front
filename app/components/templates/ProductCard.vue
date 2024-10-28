<template>
  <NuxtLink :to="`/product/${product.id}`" @click.native="active = product.id"
            class="card relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div class="relative aspect-h-4 aspect-w-3 bg-white sm:aspect-none  h-64">
      <NuxtImg :src="product.images[0]" alt="Image" :class="{ active: active === product.id }"
               class="h-full w-full object-cover object-center sm:h-full sm:w-full"/>
<!--      <div class="absolute inset-x-0 top-0 image-shadow flex h-full items-end justify-end overflow-hidden ">-->
<!--        <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-30"/>-->
<!--      </div>-->
    </div>

    <div class="flex justify-between flex-col gap-3 p-2 pt-0">
      <div class="text-gray-700 text-sm font-medium p-1 mb-2 overflow-hidden text-ellipsis">
        {{ product.name }}
      </div>
      <div class="flex justify-between items-center w-full">
       <span class="text-gray-800 font-bold p-1">
          {{ product.price }} грн
        </span>


        <span class="text-gray-500 p-1 text-xs max-w-[120px] truncate cursor-pointer"
              @click.prevent="copyBarcodeToClipboard"
              title="Натисніть, щоб скопіювати">
  {{ product.barcode ? $t('product.art') + ': ' + product.barcode : '' }}
        </span>

      </div>

      <div class="flex items-center w-full gap-2">
        <BaseButtonsSimpleSkyButton :text="$t('product.buy_button')"
                                    @click.prevent="addProductToBasket();productBasketStore.toggleModal()"
                                    class="text-sm flex-grow hover:bg-cerulean"/>

        <button @click.prevent="toggleFavoriteProduct" class="p-2 hover:scale-125 transition duration-300 ease-in-out">
          <transition name="fade" mode="out-in" class="relative w-6 h-6">
            <HeartOutlineIcon v-if="!reactiveFavoriteProduct" key="outline" class="w-6 h-6 text-red-500"/>
            <HeartSolidIcon v-else key="solid" class="w-6 h-6 text-red-500"/>
          </transition>
        </button>

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
const productBasketStore = useProductBasketStore();

const active = useState();


function copyBarcodeToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(product.barcode).then(() => {
      createFlashAlert('success', 'Артикул скопійовано до буфера обміну')
    }).catch(err => {
      createFlashAlert('error', 'Не вдалося скопіювати текст: ' + err)
    });
  } else {
    createFlashAlert('error', 'Ваш браузер не підтримує функцію копіювання до буфера обміну')
  }
}

</script>

<style scoped>
.card {
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  border-color: #5BA9D9;
  box-shadow: 0 0 4px 1px #cdf4fa;
}

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

img.active {
  view-transition-name: selected-product-img;
}
</style>
