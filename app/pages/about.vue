<template>
  <div ref="htmlContainer" v-html="content"></div>
</template>

<script setup>

import {ref, onBeforeMount} from 'vue';

import {apiMethods} from "~/composables/api/methods/apiMethods.js";
import {useHtmlRouterLinks} from "~/composables/content/useHtmlRouterLinks.ts";

definePageMeta({
  layout: 'index-layout',
});


const content = ref([]);

onBeforeMount(async () => {
  const response = await apiMethods.getPageContent('about-us');
  content.value = response.data.content;
});

const htmlContainer = ref(null);

useHtmlRouterLinks(htmlContainer, content);
</script>



<style scoped>

</style>