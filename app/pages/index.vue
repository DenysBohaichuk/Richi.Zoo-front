<template>
  <div class="page-container">
<!--    <UISwiperMainSwiper/>-->


    <div class="categories rounded-lg">
      <section class="" v-for="(section, index) in sectionedCategories" :key="index">
        <ul>
          <li v-for="category in section" :key="category.id" class="rounded-lg">
            <NuxtLink :to="`/category/${category.slug}`"
                      class="flex justify-center text-lg block py-4 text-center w-full h-full hover:bg-gray-100 hover:text-сerulean transition-colors duration-200 rounded-lg">
              <div v-if="!category.icon" class="h-6 w-6 flex-none"></div>
              <img v-else :src="category.icon" alt="" class="h-6 w-6 flex-none text-gray-400" aria-hidden="true"/>
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

  </div>
</template>

<script setup>
import {ref, computed, onBeforeMount} from 'vue';

import {getDataFromStore} from "~/mixins/MixinNavbarCategories.js";
/*definePageMeta({
  middleware: ['redirect'],
});*/
const categories = ref([]);

onBeforeMount(async () => {
  const data = await getDataFromStore();
  categories.value = data.categoriesDropdown;

  setPageLayout('default');
});

const sectionedCategories = computed(() => {
  const sections = [];
  let index = 0;
  while (index < categories.value.length) {
    const size = index === 0 ? 2 : 5;
    sections.push(categories.value.slice(index, index + size));
    index += size;
  }
  return sections;
});

</script>


<style scoped>
@import "assets/css/pages/home.css";

</style>