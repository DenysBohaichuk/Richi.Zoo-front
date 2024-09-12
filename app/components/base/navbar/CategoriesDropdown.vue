<template>
  <div class="relative isolate z-50">
    <div class="bg-white">
      <div class="mx-auto max-w-7xl">
        <div
            class="inline-flex items-center px-6 py-5 gap-x-1 text-gray-900 hover:bg-gray-100 cursor-pointer"
            @mouseenter="delayedOpenPanel"
            @mouseleave="cancelOpenPanel"
            @click="togglePanel"
        >
          <slot />
          <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>

    <transition
        enter-active-class="transition transform ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition transform ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
    >
      <div
          v-show="isPanelOpen"
          class="fixed left-0 top-15 transform translate-x-0 bg-white shadow-lg ring-1 ring-gray-900/5 w-full"
          @mouseenter="cancelClosePanel"
          @mouseleave="delayedClosePanel"
      >
        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 p-6 lg:grid-cols-2">
          <div class="grid grid-cols-2 gap-x-6 sm:gap-x-8">
            <div>
              <!-- Відображення категорій -->
              <div class="mt-6 flow-root">
                <div class="-my-2">
                  <NuxtLink
                      v-for="category in categories"
                      :key="category.name"
                      :to="`/category/${category.slug}`"
                      @mouseover="setActiveCategory(category)"
                      @click="delayedClosePanel"
                      class="flex gap-x-4 p-2 text-sm font-semibold leading-6 text-gray-900 hover:text-cerulean hover:bg-slate-100 transition-colors duration-200"
                      :class="{ 'bg-slate-100 text-cerulean': activeCategory === category }"
                  >
                    <div v-if="!category.icon" class="h-6 w-6 flex-none"></div>
                    <img
                        v-else
                        :src="category.icon"
                        alt=""
                        class="h-6 w-6 flex-none text-gray-400"
                        aria-hidden="true"
                    />
                    {{ category.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div>
              <!-- Відображення підкатегорій -->
              <div class="mt-6 flow-root" @mouseleave="clearActiveSubcategory">
                <div
                    v-if="activeCategory && activeCategory.subcategories"
                    class="-my-2"
                >
                  <NuxtLink
                      v-for="subcategory in activeCategory.subcategories"
                      :key="subcategory.name"
                      :to="`/category/${subcategory.slug}`"
                      @mouseover="setActiveSubcategory(subcategory)"
                      @click="delayedClosePanel"
                      class="flex gap-x-4 p-2 text-sm font-semibold leading-6 text-gray-900 hover:text-cerulean hover:bg-slate-100 transition-colors duration-200"
                      :class="{ 'bg-gray-100': activeSubcategory === subcategory }"
                  >
                    {{ subcategory.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
            <h3 class="sr-only">Recent posts</h3>
            <article
                v-for="post in randomPosts"
                :key="post.id"
                class="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
            >
              <div class="relative flex-none">
                <img
                    class="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                    :src="post.imageUrl"
                    alt=""
                />
                <div class="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div>
                <div class="flex items-center gap-x-4">
                  <time
                      :datetime="post.datetime"
                      class="text-sm leading-6 text-gray-600"
                  >{{ post.date }}</time
                  >
                  <a
                      :href="post.category.href"
                      class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                  >{{ post.category.title }}</a
                  >
                </div>
                <h4 class="mt-2 text-sm font-semibold leading-6 text-gray-900">
                  <a :href="post.href">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </a>
                </h4>
                <p class="mt-2 text-sm leading-6 text-gray-600">
                  {{ post.description }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { useNavbarStore } from '~/store/components/navbar.js';
import recentPosts from '~/assets/content/recentPosts.json'; // Import the JSON file
import { getDataFromStore } from '~/mixins/MixinNavbarCategories.js';
import { ref } from 'vue';

// Function to randomly select 2 posts
function getRandomPosts(posts, numberOfPosts) {
  const shuffled = posts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfPosts);
}

const randomPosts = ref(getRandomPosts(recentPosts, 2));

const isPanelOpen = ref(false);
let openTimeout = null;
let closeTimeout = null;

function delayedOpenPanel() {
  if (closeTimeout) clearTimeout(closeTimeout);
  openTimeout = setTimeout(() => {
    isPanelOpen.value = true;
  }, 200); // Затримка в 200 мс перед відкриттям
}

function cancelOpenPanel() {
  if (openTimeout) clearTimeout(openTimeout); // Скасування відкриття, якщо миша залишає кнопку раніше
  delayedClosePanel();
}

function togglePanel() {
  if (closeTimeout) clearTimeout(closeTimeout);
  if (openTimeout) clearTimeout(openTimeout);
  isPanelOpen.value = !isPanelOpen.value;
}

function delayedClosePanel() {
  if (openTimeout) clearTimeout(openTimeout);
  closeTimeout = setTimeout(() => {
    isPanelOpen.value = false;
  }, 200); // Затримка в 200 мс для плавного закриття
}

function cancelClosePanel() {
  if (closeTimeout) clearTimeout(closeTimeout);
}


const activeCategory = ref(null);
const activeSubcategory = ref(null);
const categories = ref([]);
const data = await getDataFromStore();
categories.value = data.categoriesDropdown;
activeCategory.value = categories.value[0];

const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const setActiveSubcategory = (subcategory) => {
  activeSubcategory.value = subcategory;
};

const clearActiveSubcategory = () => {
  activeSubcategory.value = null;
};
</script>
