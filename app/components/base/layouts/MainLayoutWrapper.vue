<template>
  <div>
    <BaseLoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>
    <NuxtLoadingIndicator />

    <div>
      <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none" @toggleSlideOver="toggleSlideOver"/>

      <!-- Плавний перехід між різними класами -->
      <transition name="layout-transition" mode="out-in">
        <div :class="containerClass">
          <div>
            <BaseModalsInfoModal />
            <BaseModalsBasketModal />
            <BaseSearch />
          </div>
          <slot name="main-content"/>
        </div>
      </transition>
    </div>

    <BaseSidebarSideBar :open="open" @toggleSlideOver="toggleSlideOver"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLoading, useToggle } from '~/mixins/MixinCommon.js';

// Приймаємо параметри з батьківського компонента
const props = defineProps({
  containerClass: {
    type: String,
    default: 'content text-sm',
  },
});

const { open, toggleSlideOver } = useToggle();
const { waitLoadPage } = useLoading();

</script>

<style scoped>
/* Плавна зміна між макетами */
.layout-transition-enter-active, .layout-transition-leave-active {
  transition: all 0.5s ease;
}

.layout-transition-enter, .layout-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
