<template>
  <div>
    <BaseLoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>

    <div>
      <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none"
                        @toggleSlideOver="sidebarStore.toggleSlideOver"/>

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

      <!-- Затемнення (спочатку приховане та зміщене вниз) -->
      <div id="overlay" class="fixed inset-0 bg-gradient-to-t from-gray-300 to-transparent bg-opacity-75 transition-all duration-500 transform translate-y-full opacity-0 z-30"></div>

      <transition name="menu-transition">
        <BaseMobileActionsMenu v-if="menuVisibilityStore.isVisible" />
      </transition>

    </div>
    <BaseSidebarSideBar :open="sidebarStore.isOpen" @toggleSlideOver="sidebarStore.toggleSlideOver"/>

<!--    <BaseFooter/>-->

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

.menu-transition-enter-active, .menu-transition-leave-active {
  transition: all 0.5s ease;
}

.menu-transition-enter-from, .menu-transition-leave-to {
  opacity: 0;
  transform: translateY(20px);
}



</style>
