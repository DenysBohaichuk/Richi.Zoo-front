<template>
  <div class="page-container">
   <UISwiperMainSwiper/>


    <div class="categories">
      <section class="border-dashed border-b-2" v-for="(section, index) in sectionedCategories" :key="index">
        <ul>
          <li v-for="category in section" :key="category.id" class="border-dashed border-r-2">
            <NuxtLink :to="`/category/${category.slug}`" class="text-lg block py-4 text-center w-full h-full hover:bg-gray-100 hover:text-сerulean hover:shadow-[0_0px_12px_1px_rgb(0,0,0,0.2)]">
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useModalInfoStore } from "~/store/modals/info.js";
import {apiMethods} from "~~/server/api/methods/apiMethods.js";

const categories = ref([]);
const modalInfoStore = useModalInfoStore();

onBeforeMount(async () => {
  try {
    const response = await apiMethods.getListCategories();
    if (response.status) {
      categories.value = response.data;
    } else {
      const errorMessage = response.message || 'Error fetching categories';
      modalInfoStore.openModal(errorMessage);
    }
  } catch (error) {
    modalInfoStore.openModal(false, error.message);
  }finally {
    setPageLayout('default');
  }
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