<template>
  <ClientOnly>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40" @close="productBasketStore.toggleModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 block bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <div class="fixed inset-0 z-40 overflow-y-auto">
          <div class="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-105"
                             enter-to="opacity-100 scale-100" leave="ease-in duration-200"
                             leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-105">
              <DialogPanel class="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
                <form
                    class="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
                  <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <h2 class="text-lg font-medium text-gray-900">{{ $t('basket.header') }}</h2>
                    <button type="button" class="text-gray-400 hover:text-gray-500"
                            @click="productBasketStore.toggleModal()">
                      <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                    </button>
                  </div>

                  <section aria-labelledby="cart-heading">
                    <ul v-if="products && products.length !== 0" role="list" class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                      <li v-for="(product, productIdx) in products" :key="product.id" class="flex px-4 py-6 sm:px-6">
                        <div class="flex-shrink-0">
                          <NuxtImg :src="product.images[0]" alt="image" class="w-20 rounded-md"/>
                        </div>

                        <div class="ml-6 flex flex-1 flex-col">
                          <div class="flex">
                            <div class="min-w-0 flex-1">
                              <h4 class="text-sm">
                                <NuxtLink :to="`/product/${product.id}`"
                                          @click="productBasketStore.toggleModal()"
                                          class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</NuxtLink>
                              </h4>
                              <ul class="mt-2 flex space-x-8">
                                <li v-for="(feature, index) in computeFeatureTypes(product)" :key="index" class="text-gray-500">
                                  <div :class="{'border-l border-gray-200 pl-4': index !== 0}">
                                    <h5 class="font-semibold text-sm text-gray-700">{{ feature.name }}</h5>
                                    <p class="text-sm text-gray-600">{{ feature.value }}</p>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div class="ml-4 flow-root flex-shrink-0">
                              <button type="button" @click="removeFromBasket(product)"
                                      class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Remove</span>
                                <TrashIcon class="h-5 w-5" aria-hidden="true"/>
                              </button>
                            </div>
                          </div>

                          <div class="flex flex-1 items-end justify-between pt-2">
                            <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }}</p>

                            <div class="ml-4">
                              <label :for="`quantity-${productIdx}`" class="sr-only">Quantity, {{ product.name }}</label>
                              <select :id="`quantity-${productIdx}`" v-model="product.quantity" @change="saveBasketToLocalStorage()" class="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div v-else class="text-center text-gray-500 py-8">{{ $t('basket.empty') }}</div>
                  </section>

                  <section aria-labelledby="summary-heading" class="mt-auto sm:px-6 lg:px-8" v-if="products && products.length !== 0">
                    <div class="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                      <div class="flow-root">
                        <dl class="-my-4 divide-y divide-gray-200 text-sm">
                          <div class="flex items-center justify-between py-4">
                            <dt class="text-base font-medium text-gray-900">{{ $t('basket.order_total') }}</dt>
                            <dd class="text-base font-medium text-gray-900">{{ totalAmount }} грн</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>

                  <div v-if="products && products.length !== 0" class="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                    <NuxtLink @click="useProductBasketStore().toggleModal()" to="/checkout"
                            class="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                      {{ $t('basket.continue_payment') }}
                    </NuxtLink>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue';
import { useProductBasketStore } from "~/store/modals/basket.js";
import { useProductsBasket } from "~/composables/products/basketHandler.js";
import {TrashIcon} from "@heroicons/vue/20/solid/index.js";

const productBasketStore = useProductBasketStore();
const open = computed(() => productBasketStore.isOpen);
const products = computed(() => productBasketStore.productBasket);

function removeFromBasket(product){
  const { removeProductFromBasket } = useProductsBasket(product);
  removeProductFromBasket();
}

const totalAmount = computed(() => {
  return products.value.reduce((total, product) => {
    const quantity = product.quantity ? parseInt(product.quantity, 10) : 1; // Використовуємо quantity з product або значення 1 за замовчуванням
    return total + (product.price * quantity);
  }, 0).toFixed(2); // Округлення до двох десяткових знаків
});

function saveBasketToLocalStorage() {
  useProductBasketStore().setData(products)
}

function computeFeatureTypes(product) {
  const types = {};
  product.product_features.forEach(feature => {
    if (feature.pivot.is_selected === 1) {
      const typeName = feature.feature_type.name;
      if (!types[typeName]) {
        types[typeName] = { id: feature.feature_type.id, name: typeName, value: '' };
      }
      types[typeName].value += feature.value;
    }
  });
  return Object.values(types);
}
</script>
