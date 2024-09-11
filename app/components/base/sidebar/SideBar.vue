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
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900 h-10">
                        <LazyBaseLogoHorizontalBlackLogo class="h-full"/>
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
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <!-- Єдиний кореневий елемент для Transition -->
                    <Transition :name="transitionDirection" mode="out-in">
                      <template v-if="!showCategories && !selectedCategory">
                        <div>
                          <button @click="toggleCategories" class="w-full px-4 py-2 flex text-lg font-semibold rounded-md text-center items-center gap-1 leading-6 text-gray-900 hover:text-сerulean  transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                            {{ $t('navbar.categories') }}
                          </button>
                        </div>
                      </template>

                      <template v-else-if="showCategories && !selectedCategory">
                        <div>
                          <button @click="closeCategories" class="text-blue-500 hover:underline mb-4">← Назад</button>
                          <div class="text-lg font-semibold">{{ $t('navbar.categories') }}</div>
                          <div class="space-y-4 mt-4">
                            <div v-for="category in categories" :key="category.slug" class="group">
                              <div class="flex justify-between items-center px-4 py-2 rounded-md text-sm font-semibold leading-6 text-gray-900 group-hover:text-сerulean group-hover:bg-slate-100 transition-colors duration-200 cursor-pointer">
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
                              <NuxtLink :to="`/category/${subcategory.slug}`" @click="emitCloseEvent" class="block px-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-сerulean hover:bg-slate-100 transition-colors duration-200">
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
import { useNavbarStore } from '~/store/components/navbar.js';
import { getDataFromStore } from '~/mixins/MixinNavbarCategories.js';

defineProps({
  open: Boolean
});


const emit = defineEmits(['toggleSlideOver']);

function emitCloseEvent() {
  emit('toggleSlideOver');
}

// Завантаження категорій з магазину
const categories = ref([]);
await useNavbarStore().getCategoriesDropdown();
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
