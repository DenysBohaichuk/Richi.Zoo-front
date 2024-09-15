<template>
  <div>
    <BaseLoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>
    <NuxtLoadingIndicator/>

    <div>
      <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none"
                        @toggleSlideOver="sidebarStore.toggleSlideOver"/>

      <!-- Плавний перехід між різними класами -->
      <transition name="layout-transition" mode="out-in">
        <div :class="containerClass">
          <div>
            <BaseModalsInfoModal/>
            <BaseModalsBasketModal/>
            <BaseSearch/>
          </div>

          <div :class="templateClass">
            <slot name="main-content"/>
          </div>
        </div>
      </transition>

      <!-- Затемнення (спочатку приховане та зміщене вниз) -->
      <div id="overlay" class="fixed inset-0 bg-gradient-to-t from-gray-300 to-transparent bg-opacity-75 transition-all duration-500 transform translate-y-full opacity-0 z-30"></div>

      <transition name="menu-transition">
        <BaseMobileActionsMenu v-if="menuVisibilityStore.isVisible" />
      </transition>

    </div>
    <BaseSidebarSideBar :open="sidebarStore.isOpen" @toggleSlideOver="sidebarStore.toggleSlideOver"/>

    <footer class="bg-gray-100 border-t border-gray-200 py-6">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-gray-600 text-sm">© 2024 Your Company. All rights reserved.</p>
        <nav class="mt-4 space-x-4">
          <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Terms of Service</a>
          <a href="#" class="text-gray-500 hover:text-gray-700 text-sm">Contact Us</a>
        </nav>
      </div>
    </footer>

  </div>
</template>

<script setup>
import {useLoading} from '~/mixins/MixinCommon.js';
import {useNavbarStore} from "~/store/components/navbar.js";
import {useMobileMenuStore} from "~/store/components/mobileMenu.js";
import {useSidebarStore} from "~/store/components/sidebar.js";
import {useSearchComponentStore} from "~/store/components/search.js";
import {useProductBasketStore} from "~/store/modals/basket.js";


// Приймаємо параметри з батьківського компонента
const props = defineProps({
  containerClass: {
    type: String,
    default: 'content text-sm',
  },
  templateClass: {
    type: String,
    default: '',
  },
});

//отримання категорій для NavBar та SideBar
if(!useNavbarStore().categoriesDropdown) {
  await useNavbarStore().getCategoriesDropdown();
}

const {waitLoadPage} = useLoading();
const searchComponent = useSearchComponentStore();
const sidebarStore= useSidebarStore();
const menuVisibilityStore = useMobileMenuStore();
const productBasketStore = useProductBasketStore();



watch(() => sidebarStore.isOpen, () => {
    menuVisibilityStore.toggleMenu(); // Перемкнути меню при відкритті/закритті сайдбару
});

watch(() => searchComponent.isOpen, () => {
  menuVisibilityStore.toggleMenu(); // Перемкнути меню при відкритті/закритті пошуку
});

watch(() => productBasketStore.isOpen, () => {
  menuVisibilityStore.toggleMenu(); // Перемкнути меню при відкритті/закритті кошика
});
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


.menu-transition-enter-active, .menu-transition-leave-active {
  transition: all 0.5s ease;
}

.menu-transition-enter-from, .menu-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}



</style>
