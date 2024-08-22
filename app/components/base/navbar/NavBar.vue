<template>
  <nav id="nav-bar" class="min-h-max z-10">
      <div class="h-full p-2 pl-5 logo-container">
        <div class="h-full">
          <NuxtLink to="/" class="h-full" nuxt-client>
            <LazyBaseLogoHorizontalBlackLogo class="h-full"></LazyBaseLogoHorizontalBlackLogo>
          </NuxtLink>
        </div>
      </div>
      <div class="flex w-full items-center nav-items">
        <div class="flex grow gap-4 nav-action-buttons">
<!--          <div>{{ $t('navbar.market') }}</div>
          <div>{{ $t('navbar.categories') }}</div>-->
        </div>
        <!--      <div class="flex items-center gap-4">-->
        <div class="flex gap-4 justify-between mx-5">
          <!-- Іконка пошуку -->
          <MagnifyingGlassIcon @click="searchComponent.openComponent()" class="w-6 h-6 icon-stroke cursor-pointer"/>

          <!-- Іконка улюблених -->
          <NuxtLink to="/favorites"><HeartIcon class="w-6 h-6 icon-stroke heart-icon"/></NuxtLink>

          <!-- Іконка кошика -->
          <ShoppingBagIcon class="w-6 h-6 icon-stroke heart-icon cursor-pointer" @click="productBasketStore.openModal()"/>
<!--          <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>-->
        </div>
<!--        <div v-if="!authStore.isLoggedIn" class="flex action-user gap-x-4 items-center">
          <NuxtLink to="/signup" class="flex items-center signup">{{ $t('navbar.signup') }}</NuxtLink>
          <NuxtLink to="/login" class="login bg-azure hover:bg-сerulean">{{ $t('navbar.login') }}</NuxtLink>
        </div>
        <div v-else class="action-user">
          <NuxtLink @click="logout" to="#" class="flex items-center signup" >
            <UserCircleIcon class="w-6 h-6 icon-stroke"/>
          </NuxtLink>
        </div>-->
      </div>

      <button class="burger-menu-button" @click="emitOpenEvent">
        <Bars3Icon class="w-6 h-6 icon-stroke"/>
      </button>
  </nav>
</template>

<script setup>
import {defineEmits} from 'vue'

import {UserCircleIcon, MagnifyingGlassIcon, HeartIcon, ShoppingBagIcon, Bars3Icon} from "@heroicons/vue/24/outline";
import {useAuthStore} from "~/store/user/auth.js";
import {useFavoriteProductStore} from "~/store/products/favorite.js";
import {useProductBasketStore} from "~/store/modals/basket.js";
import {useSearchComponentStore} from "~/store/components/search.js";

const authStore = useAuthStore();
const productBasketStore = useProductBasketStore();
const searchComponent = useSearchComponentStore();

onBeforeMount(() => {
  authStore.userStatus();
  productBasketStore.getData();
})

const emit = defineEmits(['toggleSlideOver'])
function emitOpenEvent() {
  emit('toggleSlideOver')
}


function logout() {
  authStore.logout()
}

</script>

<style>
@import '@/assets/css/navbar.css';

</style>