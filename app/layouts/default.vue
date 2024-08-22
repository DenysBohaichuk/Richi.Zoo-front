<template>

  <UILoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>
  <NuxtLoadingIndicator />

  <div>
    <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none" @toggleSlideOver="toggleSlideOver"/>
    <div class="content text-sm">
      <div>
        <UIModalsInfoModal/>
        <UIModalsBasketModal/>
        <BaseSearch/>
      </div>
      <slot/>
    </div>
  </div>

  <BaseSidebarSideBar :open="open" @toggleSlideOver="toggleSlideOver"/>
</template>

<script setup>
import {useLoading, useToggle} from "~/mixins/MixinCommon.js";

const { open, toggleSlideOver } = useToggle()
const { waitLoadPage } = useLoading();

onMounted(() => {
  initNavbar();
});

</script>

<style>

</style>
