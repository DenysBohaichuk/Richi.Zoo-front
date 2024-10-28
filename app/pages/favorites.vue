<template>
<div  class="min-h-screen">
  <ClientOnly>
    <BaseBreadcrumbs :breadcrumbs="[]" class="text-sm"/>
  </ClientOnly>

  <div>
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{$t('favorites.header')}}</h1>
      <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="divide-y divide-gray-200 border-t border-gray-200 lg:col-span-12">
          <div v-if="!products || products.length === 0" class="text-center text-gray-500 py-8">
            {{ $t('favorites.empty') }}
          </div>
          <ul v-else role="list">
            <li v-for="(product, productIdx) in products" :key="product.id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img :src="product.images[0]" alt="image" class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 h-full">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a :href="product.href" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                      </h3>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }} грн</p>
                    <div class="mt-1 flex text-sm">
                      <!--                      <p class="text-gray-500">{{ product.color }}</p>
                                            <p v-if="product.size" class="ml-4 border-l border-gray-200 pl-4 text-gray-500">{{ product.size }}</p>-->
                      <li v-for="(feature, index) in computeFeatureTypes(product)" :key="feature.id"
                          :class="{
      'ml-4 border-l border-gray-200 pl-4': index !== 0,
      'text-gray-500': true
    }">
                        <h5 class="font-semibold">{{ feature.name }}</h5>
                        <p class="text-gray-600">{{ feature.value }}</p>
                      </li>

                    </div>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${product.id}`" class="sr-only">Quantity</label>
                    <select :id="`quantity-${product.id}`" :name="`quantity-${product.id}`" v-model="product.quantity" @change="saveFavoritesToLocalStorage()" class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" ref="quantitySelect">
                      <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>

                    <div class="absolute right-0 top-0">
                      <button @click="toggleFavoriteProduct(product)" type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>

                    <BaseButtonsSimpleSkyButton class="absolute bottom-0 right-0" :text="$t('product.add_basket_button')" @click="() => addToBasket(product)"/>
                  </div>
                </div>

                <!--                <p class="mt-4 flex space-x-2 text-sm text-gray-700">-->
                <!--                  <CheckIcon v-if="product.inStock" class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />-->
                <!--                  <ClockIcon v-else class="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />-->
                <!--                  <span>{{ product.inStock ? 'In stock' : `Ships in ${product.leadTime}` }}</span>-->
                <!--                </p>-->
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <!--        <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                  <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

                  <dl class="mt-6 space-y-4">
                    <div class="flex items-center justify-between">
                      <dt class="text-sm text-gray-600">Subtotal</dt>
                      <dd class="text-sm font-medium text-gray-900">$99.00</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt class="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Learn more about how shipping is calculated</span>
                          <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                      </dt>
                      <dd class="text-sm font-medium text-gray-900">$5.00</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt class="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Learn more about how tax is calculated</span>
                          <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                        </a>
                      </dt>
                      <dd class="text-sm font-medium text-gray-900">$8.32</dd>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt class="text-base font-medium text-gray-900">Order total</dt>
                      <dd class="text-base font-medium text-gray-900">$112.32</dd>
                    </div>
                  </dl>

                  <div class="mt-6">
                    <button type="submit" class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Checkout</button>
                  </div>
                </section>-->
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import {XMarkIcon} from "@heroicons/vue/20/solid";
import {useFavoriteProductStore} from "~/store/products/favorite";
import {useProductsBasket} from "~/composables/products/basketHandler";
const favoriteProductStore = useFavoriteProductStore();
const products = computed(() => favoriteProductStore.favoriteProducts)

function toggleFavoriteProduct(product) {
  const { toggleFavoriteProduct, reactiveFavoriteProduct, checkIfProductInFavorites } = useFavoriteProducts(product);
  reactiveFavoriteProduct.value = checkIfProductInFavorites();
  toggleFavoriteProduct();
}

function addToBasket(product) {
  // Отримання кількості для конкретного продукту
  const selectElement = document.querySelector(`#quantity-${product.id}`);
  const quantity = selectElement ? selectElement.value : 1; // Значення за замовчуванням - 1, якщо кількість не вказана

  // Додавання нової властивості до продукту
  const productWithQuantity = { ...product, quantity };

  const { addProductToBasket } = useProductsBasket(productWithQuantity);
  addProductToBasket();
}

onMounted(()=>{
  favoriteProductStore.getData();
})


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

function saveFavoritesToLocalStorage() {
  useFavoriteProductStore().setData(products)
}

const config = useAppConfig();
const { t } = useI18n();

useHead({
  title:`${t('favorites.header')} | ${config.projectName}`,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: t('favorites.metaDescription') },
    { property: 'og:title', content: removeProjectNameSeparator(`${t('favorites.header')} | ${config.projectName}`) },
    { property: 'og:description', content: t('favorites.metaOgDescription') },
    { property: 'og:image', content: `${config.domain}/images/favorites-og-image.jpg` } // Додайте зображення для відображення у соцмережах
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('favorites.header'),
        "itemListElement": (products.value && products.value.length > 0)
            ? products.value.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "image": product.images[0],
                "offers": {
                  "@type": "Offer",
                  "url": `${config.domain}/product/${product.id}`,
                  "priceCurrency": "UAH",
                  "price": product.price,
                  "availability": "https://schema.org/InStock",
                  "itemCondition": "https://schema.org/NewCondition"
                }
              }
            }))
            : []
      })
    }
  ]
});
</script>


<style scoped>

</style>