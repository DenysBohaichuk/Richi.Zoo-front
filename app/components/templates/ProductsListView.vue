<template>
  <div class="bg-white min-h-screen">
    <div class="flex justify-center">
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                           enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                           leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-black bg-opacity-25"/>
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                             enter-from="translate-x-full" enter-to="translate-x-0"
                             leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                             leave-to="translate-x-full">
              <DialogPanel
                  class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button type="button"
                          class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          @click="mobileFiltersOpen = false">
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                  </button>
                </div>

                <!-- Filters -->
<!--                <form class="mt-4 border-t border-gray-200">
                  <h3 class="sr-only">Categories</h3>
                  <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                    <li v-for="category in subCategories" :key="category.name">
                      <a :href="category.href" class="block px-2 py-3">{{ category.name }}</a>
                    </li>
                  </ul>

                  <Disclosure as="div" v-for="section in filters" :key="section.id"
                              class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                          class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon
                              v-if="!open"
                              class="h-5 w-5"
                              aria-hidden="true"
                          />
                          <MinusIcon
                              v-else
                              class="h-5 w-5"
                              aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div v-for="(option, optionIdx) in section.options" :key="option.value"
                             class="flex items-center">
                          <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                                 :value="option.value" type="checkbox" :checked="option.checked"
                                 class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                          <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                                 class="ml-3 min-w-0 flex-1 text-gray-500">{{ option.label }}</label>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>-->
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">{{ category.name }}</h1>
          <!--          <div class="flex items-center">-->
          <!--            <Menu as="div" class="relative inline-block text-left">-->
          <!--              <div>-->
          <!--                <MenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">-->
          <!--                  Sort-->
          <!--                  <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />-->
          <!--                </MenuButton>-->
          <!--              </div>-->

          <!--              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">-->
          <!--                <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">-->
          <!--                  <div class="py-1">-->
          <!--                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">-->
          <!--                      <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>-->
          <!--                    </MenuItem>-->
          <!--                  </div>-->
          <!--                </MenuItems>-->
          <!--              </transition>-->
          <!--            </Menu>-->

          <!--            <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">-->
          <!--              <span class="sr-only">View grid</span>-->
          <!--              <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />-->
          <!--            </button>-->
          <!--            <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" @click="mobileFiltersOpen = true">-->
          <!--              <span class="sr-only">Filters</span>-->
          <!--              <FunnelIcon class="h-5 w-5" aria-hidden="true" />-->
          <!--            </button>-->
          <!--          </div>-->
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <ClientOnly>
              <!-- Filters -->
              <form class="mt-4">
                <Disclosure as="div" v-for="section in filters" :key="section.id"
                            class="px-4 py-6"
                            :default-open="disclosureStore.filterOpenStates[section.slug]" v-slot="{ open }">
                  <h3 class="-mx-2 -my-3 flow-root">
                    <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        @click="disclosureStore.toggleFilterSection(section.id)">
                      <span class="font-medium text-gray-900">{{ section.name }}</span>

                      <span class="ml-6 flex items-center">
            <PlusIcon
                v-if="!open && (selectedFilters[section.slug])"
                class="h-5 w-5"
                aria-hidden="true"
            />
            <MinusIcon
                v-else
                class="h-5 w-5"
                aria-hidden="true"
            />
          </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel class="pt-6">
                    <div class="space-y-6">
                      <div v-for="option in section.filter_values" :key="option.id" class="flex items-center">
                        <input
                            type="checkbox"
                            :id="`filter-${section.id}-${option.id}`"
                            :name="`filter-${section.id}`"
                            :value="option.id"
                            v-model="selectedFilters[section.slug]"
                            @change="toggleFilterValue(section.slug, option.id)"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label :for="`filter-${section.id}-${option.id}`" class="ml-3 text-sm text-gray-600">
                          {{ option.value }}
                        </label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>

                <PriceSlider v-model="selectedFilters.price" :minPrice="0" :maxPrice="20000" @update:modelValue="updateUrlWithFilters" />


              </form>
            </ClientOnly>
            <!-- Product grid -->
            <div class="lg:col-span-3">
              <TemplatesProductGrid :products="products"/>

            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon} from '@heroicons/vue/20/solid'
import {useFilterStore} from "~/store/categories/filter.js";
import PriceSlider from "~/components/base/filter/PriceSlider.vue";

const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();

const disclosureStore = useFilterStore();

const mobileFiltersOpen = ref(false)


const props = defineProps({
  category: Object,
  products: Array,
  filters: Array
});


const category = props.category;
const products = ref(props.products);
const filters = ref(props.filters);


const route = useRoute();
const router = useRouter();

watch(
    () => props.products,
    (newProducts) => {
      products.value = newProducts;
    },
);

const selectedFilters = ref({});



onMounted(() => {
  initializeFiltersFromQuery(route.query);
  console.log(products.value)
  console.log(props.products)

  const selectedFiltersValue = selectedFilters.value; // ваш об'єкт
  const keysWithValues = Object.keys(selectedFiltersValue).filter(key =>
      Array.isArray(selectedFiltersValue[key]) && selectedFiltersValue[key].length > 0
  );

  filters.value.forEach(section => {
    if (disclosureStore.filterOpenStates[section.slug] === undefined) {
      disclosureStore.initializeFilterOpen(section.slug, keysWithValues.includes(section.slug));
    }
  });
});


watch(selectedFilters, () => {
  updateUrlWithFilters();
}, {deep: true});


function initializeFiltersFromQuery(query) {
  filters.value.forEach(section => {
    const filterName = section.slug;


    if (filterName === "price") {
      selectedFilters.value[filterName] = [
        query.price_min ? Number(query.price_min) : 0,
        query.price_max ? Number(query.price_max) : 20000
      ];
    } else {
      const queryParam = query[filterName];
      selectedFilters.value[filterName] = queryParam ? queryParam.split(',') : [];
    }

  });
}


function updateUrlWithFilters() {
  const query = {...route.query};

  Object.keys(selectedFilters.value).forEach(filterName => {
    const values = selectedFilters.value[filterName];
    const name = filters.value.find(section => section.slug == filterName)?.slug;

    if (filterName === "price") {
      query.price_min = values[0];
      query.price_max = values[1];
    } else if (values.length) {
      query[name] = values.join(',');
    } else {
      delete query[name];
    }
  });

  router.push({query}).catch(() => {
  }); // Оновлення URL без перезавантаження
}

function toggleFilterValue(filterName, valueId) {
  if (!selectedFilters[filterName]) {
    selectedFilters[filterName] = [];
  }
console.log(props.products)
  const filterValues = selectedFilters[filterName];
  const index = filterValues.indexOf(valueId);

  if (index === -1) {
    selectedFilters[filterName] = [...filterValues, valueId];
  } else {
    selectedFilters[filterName] = filterValues.filter(val => val !== valueId);
  }
}


// Визначаємо текст для мета-опису
const categoryDescription = category.plainDescription?.trim() || 'Перегляньте наші товари у категорії...';

/*useHead({
  title: `${category.name} | ${appConfig.projectName}`,
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'description', content: categoryDescription },
    { property: 'og:title', content: category.name + ' | ' + appConfig.projectName },
    { property: 'og:description', content: categoryDescription },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": runtimeConfig.public.appURL + '/product/' + product.id,
          "item": {
            "@type": "Product",
            "name": product.name,
            "image": product.images[0],
            "description": product.plainDescription,
            "sku": product.barcode,
            "offers": {
              "@type": "Offer",
              "url": runtimeConfig.public.appURL + '/product/' + product.id,
              "priceCurrency": "UAH",
              "price": product.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            }
          }
        }))
      })
    }
  ]
});*/
</script>