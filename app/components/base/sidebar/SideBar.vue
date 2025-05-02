<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="emitCloseEvent">
      <TransitionChild as="template"
                       enter="ease-in-out duration-500"
                       enter-from="opacity-0"
                       enter-to="opacity-100"
                       leave="ease-in-out duration-500"
                       leave-from="opacity-100"
                       leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template"
                             enter="transform transition ease-in-out duration-500 sm:duration-700"
                             enter-from="translate-x-full"
                             enter-to="translate-x-0"
                             leave="transform transition ease-in-out duration-500 sm:duration-700"
                             leave-from="translate-x-0"
                             leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="pl-4 pr-2 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900 h-10">
                        <LazyBaseLogoHBL3 class="h-full"/>
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button"
                                class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                @click="emitCloseEvent">
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Відображення початкових кнопок або категорій -->
                  <div class="relative mt-6 flex-1 pl-4 pr-2 sm:px-6">
                    <!-- Єдиний кореневий елемент для Transition -->
                    <Transition :name="transitionDirection" mode="out-in">
                      <template v-if="!showCategories && !selectedCategory">
                        <div>

                          <button @click="toggleCategories" class="w-full px-4 py-2 flex text-lg font-semibold rounded-md text-center items-center gap-1 leading-6 text-gray-900 group">
                            <Squares2X2Icon class="w-6 h-6 icon-stroke heart-icon group-hover:text-green-600 transition-colors duration-200"/>
                            <span class="group-hover:text-cerulean transition-colors duration-200">{{ $t('navbar.categories') }}</span>
                          </button>

                          <!-- Блок авторизації -->
                          <div class="border-t border-b border-gray-200 py-4 mb-4">
                            <div class="flex items-center gap-3  pb-3">
                              <!-- Іконка користувача -->
                              <UserCircleIcon class="w-8 h-8 text-gray-600 icon-stroke" />

                              <div class="flex-1 mt-1">
                                <div v-if="authStore.isLoggedIn">
                                  <p class="text-base font-medium text-gray-800">
                                    {{ authStore.user?.name }} {{ authStore.user?.surname || '' }}
                                  </p>
                                  <p class="text-sm text-gray-500 truncate">
                                    {{ authStore.user?.email }}
                                  </p>
                                </div>

                                <h3 v-else class="text-lg font-semibold text-gray-900">
                                  {{ $t('sidebar.personalCabinet') }}
                                </h3>
                              </div>
                            </div>

                            <!-- Кнопка "Увійти" (якщо не авторизований) -->
                            <div v-if="!authStore.isLoggedIn" class="px-4">
                              <NuxtLink
                                  to="/login"
                                  @click="emitCloseEvent"
                                  class="block w-full text-center bg-azure text-white px-4 py-2 rounded-md hover:bg-cerulean transition-colors duration-200"
                              >
                                {{ $t('sidebar.loginToCabinet') }}
                              </NuxtLink>
                            </div>

                            <!-- Кнопка "Перейти до профілю" (якщо авторизований) -->
                            <div v-else class="px-4">
                              <NuxtLink
                                  to="/profile"
                                  @click="emitCloseEvent"
                                  class="block w-full text-center bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
                              >
                                {{ $t('sidebar.goToProfile') }}
                              </NuxtLink>
                            </div>
                          </div>

                          <NuxtLink to="/favorites" @click="emitCloseEvent" class="w-full px-4 py-2 flex text-lg font-semibold rounded-md text-center items-center gap-1 leading-6 text-gray-900 group">
                            <HeartIcon class="w-6 h-6 icon-stroke heart-icon group-hover:text-red-600 transition-colors duration-200"/>
                            <span class="group-hover:text-cerulean transition-colors duration-200">{{ $t('navbar.favorites') }}</span>
                          </NuxtLink>

                          <div @click="handleSidebarCloseAndOpenBasketModal" class="w-full px-4 py-2 flex text-lg font-semibold rounded-md text-center items-center gap-1 leading-6 text-gray-900 group">
                            <ShoppingBagIcon class="w-6 h-6 icon-stroke heart-icon cursor-pointer group-hover:text-orange-600 transition-colors duration-200"/>
                           <span class="group-hover:text-cerulean transition-colors duration-200">{{ $t('navbar.basket') }}</span>
                          </div>
                        </div>
                      </template>

                      <template v-else-if="showCategories && !selectedCategory">
                        <div>
                          <button @click="closeCategories" class="text-blue-500 hover:underline mb-4">← Назад</button>
                          <div class="text-lg font-semibold">{{ $t('navbar.categories') }}</div>
                          <div class="space-y-4 mt-4">
                            <div v-for="category in categories" :key="category.slug" class="group">
                              <div class="flex justify-between items-center px-4 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 group-hover:text-cerulean group-hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
                                <!-- Перехід на сторінку категорії -->
                                <NuxtLink :to="`/category/${category.slug}`" @click="emitCloseEvent" class="flex-1">
                                  {{ category.name }}
                                </NuxtLink>

                                <!-- Перехід у підкатегорії -->
                                <ChevronRightIcon @click.stop="selectCategory(category)" class="h-5 w-5 transition-transform cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template v-else>
                        <div>
                          <button @click="deselectCategory" class="text-blue-500 hover:underline mb-4">← Назад до категорій</button>
                          <div class="text-lg font-semibold">{{ selectedCategory.name }}</div>
                          <div class="space-y-4 mt-4">
                            <div v-for="subcategory in selectedCategory.subcategories" :key="subcategory.slug" class="group">
                              <NuxtLink :to="`/category/${subcategory.slug}`" @click="emitCloseEvent" class="block px-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-cerulean hover:bg-slate-100 transition-colors duration-200">
                                {{ subcategory.name }}
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Transition>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { defineProps, defineEmits, ref } from 'vue';
import { getDataFromStore } from '~/mixins/MixinNavbarCategories.js';
import {UserCircleIcon, HeartIcon, ShoppingBagIcon, Squares2X2Icon} from "@heroicons/vue/24/outline/index.js";
import {useProductBasketStore} from "~/store/modals/basket.js";
import {useAuthStore} from "~/store/user/auth.js";

const authStore = useAuthStore();
onBeforeMount(()=>{
  authStore.userData();
})


defineProps({
  open: {
    type: Boolean,
    default: false,
  }
});

const productBasketStore = useProductBasketStore();
const emit = defineEmits(['toggleSlideOver']);

function emitCloseEvent() {
  emit('toggleSlideOver');
}

function  handleSidebarCloseAndOpenBasketModal(){
  emitCloseEvent();
  productBasketStore.toggleModal()
}

// Завантаження категорій з магазину
const categories = ref([]);
const data = await getDataFromStore();
categories.value = data.categoriesDropdown;

// Стан для керування напрямком анімації та категоріями
const showCategories = ref(false);
const selectedCategory = ref(null);
const transitionDirection = ref('slide-left');

// Показати категорії
const toggleCategories = () => {
  transitionDirection.value = 'slide-left';
  showCategories.value = true;
};

// Закрити список категорій і повернутися до початкового екрана
const closeCategories = () => {
  transitionDirection.value = 'slide-right';
  showCategories.value = false;
  selectedCategory.value = null;
};

// Вибір категорії
const selectCategory = (category) => {
  transitionDirection.value = 'slide-left';
  selectedCategory.value = category;
};

// Повернення до списку категорій
const deselectCategory = () => {
  transitionDirection.value = 'slide-right';
  selectedCategory.value = null;
};

</script>

<style>
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.4s ease-in-out;
}

.slide-left-enter, .slide-right-leave-to {
  transform: translateX(110%);
  opacity: 0;
}

.slide-left-leave-to, .slide-right-enter {
  transform: translateX(-110%);
  opacity: 0;
}

.slide-left-enter-from, .slide-left-leave-to,
.slide-right-enter-from, .slide-right-leave-to{
  opacity: 0;
}

</style>
