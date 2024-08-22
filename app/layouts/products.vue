<template>

  <UILoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>
  <NuxtLoadingIndicator />

  <div>
    <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none" @toggleSlideOver="toggleSlideOver"/>
    <div class="flex justify-center pt-16 bg-white text-sm">
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



/*const isSearchOpen = ref(false)

const openSearch = () => {
  isSearchOpen.value = true
}

const closeSearch = () => {
  isSearchOpen.value = false
}

// Забезпечуємо доступ до цих функцій у всіх дочірніх компонентах
provide('openSearch', openSearch)
provide('closeSearch', closeSearch)
provide('isSearchOpen', isSearchOpen)*/
</script>

