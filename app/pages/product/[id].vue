<template>
  <div >

    <ClientOnly>
      <BaseBreadcrumbs :breadcrumbs="data.breadcrumbs" />
    </ClientOnly>

    <main class="mx-auto max-w-7xl sm:px-6 pt-8 sm:pt-16 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <!-- Product -->
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <!-- Image gallery -->
          <BaseSwiperProductSwiper :images="productImages"/>

          <!-- Pro5--5duct info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

            <div class="mt-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">{{ product.price }} грн</p>
            </div>

            <!-- Reviews -->
            <!--            <div class="mt-3">
                          <h3 class="sr-only">Reviews</h3>
                          <div class="flex items-center">
                            <div class="flex items-center">
                              <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                                        :class="[product.rating > rating ? 'text-indigo-500' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']"
                                        aria-hidden="true"/>
                            </div>
                            <p class="sr-only">{{ product.rating }} out of 5 stars</p>
                          </div>
                        </div>-->

            <div class="mt-6">
              <h3 class="sr-only"></h3>

              <!--              <div class="space-y-6 text-base text-gray-Description700" v-html="product.description"/>-->
            </div>
            <ClientOnly>
              <form class="mt-6">
                <!-- Types -->
                <div>
                  <div v-for="featureType in featureTypes" :key="featureType.name" class="mb-4">
                    <h3 class="text-sm text-gray-600">{{ featureType.name }}</h3>

                    <RadioGroup v-model="selectedProduct" class="mt-4">
                      <div class="flex items-center space-x-2 mt-2">
                        <RadioGroupOption
                            as="div"
                            v-for="productType in getProductsByFeature(featureType.name)"
                            :key="productType.id"
                            :value="productType"
                        >
                          <!-- NuxtLink wrapping the entire option -->
                          <NuxtLink
                              v-if="hasRedirect(productType)"
                              :to="`/product/${productType.id}`"
                              class="relative flex cursor-pointer items-center justify-center rounded-xl p-2 focus:outline-none"
                              :class="getRingClass(productType.id)"
                          >
                          <span aria-hidden="true" class="flex flex-col items-center">
                <img
                    :src="productType.image[0]"
                    :alt="getFeatureValue(productType, featureType.name)"
                    class="h-12 w-12 rounded-xl border border-black border-opacity-10"
                />
                <span class="mt-1 text-base font-semibold">{{ getFeatureValue(productType, featureType.name) }}</span>
              </span>
                          </NuxtLink>

                          <!-- Static display if no redirect -->
                          <div
                              v-else
                              class="relative flex cursor-pointer items-center justify-center rounded-xl p-2 focus:outline-none"
                          >
                            <RadioGroupLabel as="span" class="sr-only">{{
                                getFeatureValue(productType, featureType.name)
                              }}
                            </RadioGroupLabel>
                            <span aria-hidden="true" class="flex flex-col items-center">
                <img
                    :src="productType.image[0]"
                    :alt="getFeatureValue(productType, featureType.name)"
                    class="h-12 w-12 rounded-xl border border-black border-opacity-10"
                />
                <span class="mt-1 text-base font-semibold">{{ getFeatureValue(productType, featureType.name) }}</span>
              </span>
                          </div>
                        </RadioGroupOption>
                      </div>
                    </RadioGroup>
                  </div>

                  <!-- Відображення вибраних характеристик -->
                  <div class="mt-4 text-sm text-gray-600">
      <span v-for="(value, key) in selectedFeatures" :key="key">
        {{ value }}{{ key !== lastFeatureKey ? ' · ' : '' }}
      </span>
                  </div>
                </div>

                <div class="mt-10 flex">

                  <BaseButtonsSimpleSkyButton class="!w-full" :text="$t('product.buy_button')"
                                            @click.prevent="addProductToBasket();openModal() "/>

                  <div class="transition duration-700 ease-in-out">
                    <button @click.prevent="toggleFavoriteProduct" class="p-2">
                      <transition name="fade" mode="out-in" class="relative w-6 h-6">
                        <HeartOutlineIcon v-if="!reactiveFavoriteProduct" key="outline"
                                          class="w-6 h-6 text-red-500 absolute "/>
                        <HeartSolidIcon v-else key="solid" class="w-6 h-6 text-red-500 absolute"/>
                      </transition>
                    </button>
                  </div>
                </div>
              </form>
            </ClientOnly>
          </div>
        </div>

        <section aria-labelledby="related-heading" class="mt-10 border-t border-gray-200 px-4 pb-16 sm:px-0">
          <div class="mt-8 grid grid-cols-1 gap-y-12 lg:grid-cols-2 sm:gap-x-6 xl:gap-x-8">
            <!-- Description and features -->
            <TabGroup as="div">
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex space-x-8 relative">
                  <div
                      class="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out"
                      :style="{ width: `${indicators[0].width}px`, transform: `translateX(${indicators[0].left}px)` }"
                  ></div>
                  <Tab
                      as="template"
                      v-for="(detail, index) in tabProductDetails"
                      :key="detail.id"
                      v-slot="{ selected }"
                  >
                    <button
                        :ref="el => setTabRef(el, index, 0)"
                        @click="updateIndicator(index, 0)"
                        :class="[
              selected
                ? 'text-indigo-600 focus:outline-none'
                : 'text-gray-700 hover:text-gray-800',
              'relative whitespace-nowrap border-transparent py-6 text-sm font-medium',
            ]"
                    >
                      {{ detail.name }}
                    </button>
                  </Tab>
                </TabList>
              </div>

              <TabPanels as="template">
                <!-- Panel 1 -->
                <TabPanel class="p-4">
                  <div class="mt-4 text-sm text-gray-500">
                    <div v-html="product.description"></div>
                  </div>
                </TabPanel>

                <!-- Panel 2 -->
                <TabPanel class="p-4">
                  <div class="mt-4 text-sm text-gray-500">
                    <ul class="mt-4 space-y-4">
                      <li v-for="feature in productFeatures" :key="feature.feature_id"
                          class="border-b border-gray-200 pb-2">
                        <h3 class="font-semibold">{{ feature.feature_type.name }}</h3>
                        <p class="text-gray-600">{{ feature.value }}</p>
                      </li>
                    </ul>
                  </div>
                </TabPanel>

                <!-- Panel 3 -->
                <TabPanel class="p-4">
                  <div class="mt-4 text-sm text-gray-500">
                    <p>This is where license information will be displayed.</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>

            <!-- Terms of order -->
            <TabGroup as="div">
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex space-x-8 relative">
                  <div
                      class="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-out"
                      :style="{ width: `${indicators[1].width}px`, transform: `translateX(${indicators[1].left}px)` }"
                  ></div>
                  <Tab
                      as="template"
                      v-for="(term, index) in tabTermsOfOrder"
                      :key="index"
                      v-slot="{ selected }"
                  >
                    <button
                        :ref="el => setTabRef(el, index, 1)"
                        @click="updateIndicator(index, 1)"
                        :class="[
              selected
                ? 'text-indigo-600 focus:outline-none'
                : 'text-gray-700 hover:text-gray-800',
              'relative whitespace-nowrap border-transparent py-6 text-sm font-medium',
            ]"
                    >
                      {{ term.name }}
                    </button>
                  </Tab>
                </TabList>
              </div>

              <TabPanels>
                <TabPanel v-for="(term, index) in tabTermsOfOrder" :key="index">
                  <div class="p-4" v-html="term.content"></div>
                </TabPanel>
              </TabPanels>
            </TabGroup>

          </div>
        </section>
        <!--        <section aria-labelledby="related-heading" class="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">-->
        <!--          <h2 id="related-heading" class="text-xl font-bold text-gray-900">Customers also bought</h2>-->

        <!--          <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">-->
        <!--            <div v-for="product in relatedProducts" :key="product.id">-->
        <!--              <div class="relative">-->
        <!--                <div class="relative h-72 w-full overflow-hidden rounded-lg">-->
        <!--                  <img :src="product.imageSrc" :alt="product.imageAlt"-->
        <!--                       class="h-full w-full object-cover object-center"/>-->
        <!--                </div>-->
        <!--                <div class="relative mt-4">-->
        <!--                  <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>-->
        <!--                  <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>-->
        <!--                </div>-->
        <!--                <div class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">-->
        <!--                  <div aria-hidden="true"-->
        <!--                       class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"/>-->
        <!--                  <p class="relative text-lg font-semibold text-white">{{ product.price }}</p>-->
        <!--                </div>-->
        <!--              </div>-->
        <!--              <div class="mt-6">-->
        <!--                <a :href="product.href"-->
        <!--                   class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"-->
        <!--                >Add to bag<span class="sr-only">, {{ product.name }}</span></a-->
        <!--                >-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </section>-->
      </div>
    </main>
  </div>
</template>

<script setup>

import {useProductsBasket} from "~/composables/products/basketHandler.js";

definePageMeta({
  middleware: ['get-product']
});
const tabRefs = ref([[], []]); // Массив для збереження посилань на таби (2 групи)
const indicators = ref([
  {width: 0, left: 0},
  {width: 0, left: 0},
]);

// Універсальні функції для обробки табів
const setTabRef = (el, index, groupIndex) => {
  if (el) {
    tabRefs.value[groupIndex][index] = el;
  }
};

const updateIndicator = (index, groupIndex) => {
  const tab = tabRefs.value[groupIndex][index];
  if (tab) {
    indicators.value[groupIndex] = {
      width: tab.offsetWidth,
      left: tab.offsetLeft,
    };
  }
};


import {ref} from 'vue'
import {HeartIcon as HeartOutlineIcon} from "@heroicons/vue/24/outline";
import {HeartIcon as HeartSolidIcon} from "@heroicons/vue/24/solid";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'

import {getDataFromStore} from "~/mixins/MixinProduct.js";
import {useProductBasketStore} from "~/store/modals/basket.js";

const config = useAppConfig();

const open = ref(false)

const tabProductDetails = [
  {
    name: "Опис",
    description: "Опис",
  },
  {
    name: "Характеристики",
    description: "Характеристики",
  },
  /*  {
      name: "Відгуки",
      description: "Відгуки",
    },*/
]
const tabTermsOfOrder = ref([
  {
    name: 'Доставка',
    content: `
      <div class="mt-4 text-sm text-gray-500">
        <h3 class="font-semibold">Самовивіз із відділення</h3>
        <p>Від 850 грн - Безкоштовно</p>
        <p>До 849 грн - 49 грн</p>
        <p>Відправлення вагових замовлень більше 30 кг. Розміри не більше 120x70x70 см.</p>

        <h3 class="font-semibold mt-4">Доставка в поштомат</h3>
        <p>Від 850 грн - Безкоштовно</p>
        <p>До 849 грн - 49 грн</p>
        <p>Обмеження по вазі до 20 кг і розмір 40x60x30 см.</p>

        <h3 class="font-semibold mt-4">Кур'єром за адресою</h3>
        <p>Від 1500 грн - Безкоштовно</p>
        <p>До 1499 грн - 99 грн</p>
      </div>
    `
  },
  {
    name: 'Оплата',
    content: `
      <div class="mt-4 text-sm text-gray-500">
        <h3 class="font-semibold">Оплата замовлення</h3>
        <p>Онлайн картою Visa або Mastercard</p>
        <p>"Оплата частинами" від ПриватБанку</p>
        <p>Оплата при отриманні</p>
      </div>
    `
  },
  {
    name: 'Повернення',
    content: `
      <div class="mt-4 text-sm text-gray-500">
        <p>Ви можете відмовитися від доставленого товару в разі:</p>
        <ul class="list-disc pl-5">
          <li>Якщо він не відповідає тому артикулу, який ви замовляли, не працює або зіпсований.</li>
          <li>Якщо він не задовольняє вас за формою, габаритами, фасоном, кольором, розміром або з інших причин.</li>
        </ul>
        <p class="mt-4">Повернення товару здійснюється відповідно до Закону України "Про захист прав споживачів".</p>
        <ul class="list-disc pl-5">
          <li>Продовольчі товари</li>
          <li>Товари медичного призначення</li>
          <li>Парфумерно-косметичні товари</li>
          <li>Іграшки, постільні приналежності</li>
        </ul>
        <p class="mt-4 font-semibold text-red-500">Обов'язково перевіряйте товар відразу на відділенні Нова Пошта або при доставці кур'єром.</p>
      </div>
    `
  }
]);

const data = await getDataFromStore();
const product = ref(null);
const productFeatures = ref(null);
const productTypes = ref(null);
const productImages = ref([]);
const {reactiveFavoriteProduct, toggleFavoriteProduct, loadFavoriteItems} = useFavoriteProducts(data.product);
const {addProductToBasket} = useProductsBasket(data.product);
const {openModal} = useProductBasketStore();

product.value = data.product;
product.value.quantity = 1;
productFeatures.value = product.value.product_features;
productTypes.value = data.productTypes;
productImages.value = product.value.images


// Форматування даних для зручного відображення
const featureTypes = computed(() => {
  const types = {};
  productTypes.value.forEach(product => {
    product.product_features.forEach(feature => {
      if (feature.pivot.is_selected === 1) {
        const typeName = feature.feature_type.name;
        if (!types[typeName]) {
          types[typeName] = {id: feature.feature_type.id, name: typeName, options: []};
        }
        types[typeName].options.push({...feature, product});
      }
    });
  });
  return Object.values(types);
});

// Вибрані характеристики
const selectedFeatures = ref({});

// Вибраний товар
const selectedProduct = ref(product.value.id);

// Функція для отримання товарів за типом характеристики
function getProductsByFeature(typeName) {
  return productTypes.value.filter(product => {
    return product.product_features.some(feature => feature.feature_type.name === typeName);
  });
}

// Функція для отримання значення характеристики
function getFeatureValue(productType, typeName) {
  const feature = productType.product_features.find(f => f.feature_type.name === typeName);
  return feature ? feature.value : productType.name;
}

// Функція для перевірки, чи потрібно перенаправлення
function hasRedirect(productType) {
  return productType.product_features.some(feature => feature.feature_type.redirect === 1);
}

// Отримання останнього ключа для коректного форматування вибраних характеристик
const lastFeatureKey = computed(() => {
  return Object.keys(selectedFeatures.value).pop();
});

// Функція для визначення класу обведення
function getRingClass(productId) {
  if (selectedProduct.value && selectedProduct.value === productId) {
    return 'ring-2 ring-indigo-500';
  } else {
    return 'border border-gray-300';
  }
}

function setIconStateFromStorage() {
  const cartItems = loadFavoriteItems();
  const productInCart = cartItems.find(item => item.id === data.product.id);
  reactiveFavoriteProduct.value = !!productInCart;
}

onMounted(() => {
  setIconStateFromStorage();

  tabRefs.value.forEach((tabs, groupIndex) => {
    if (tabs.length > 0) {
      updateIndicator(0, groupIndex);
    }
  });
});

useHead({
  title: `${product.value.name} | ${config.projectName}`,
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'description', content: product.value.plainDescription  },
    { property: 'og:title', content: `${product.value.name} | ${config.projectName}` },
    { property: 'og:description', content: product.value.plainDescription },
    { property: 'og:image', content: product.value.images[0] }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.value.name,
        "image": product.value.images[0],
        "description": product.value.plainDescription,
        "sku": product.value.barcode,
        "offers": {
          "@type": "Offer",
          "url": config.domain + '/product/' + product.value.id,
          "priceCurrency": "UAH",
          "price": product.value.price,
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      })
    }
  ]
})
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