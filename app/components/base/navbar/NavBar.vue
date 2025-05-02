<template>
  <nav id="nav-bar" class="min-h-max z-40 text-lg">
      <div class="h-full p-2 pl-5 logo-container">
        <div class="h-full">
          <NuxtLink to="/" class="h-full" nuxt-client>
            <LazyBaseLogoHBL3 class="h-full"></LazyBaseLogoHBL3>
          </NuxtLink>
        </div>
      </div>
      <div class="flex w-full items-center nav-items">
        <div class="flex grow gap-4 nav-action-buttons">
<!--          <div>{{ $t('navbar.market') }}</div>-->
          <BaseNavbarCategoriesDropdown>{{ $t('navbar.categories') }}</BaseNavbarCategoriesDropdown>
        </div>
        <!--      <div class="flex items-center gap-4">-->
        <div class="flex gap-4 justify-between mx-5">
          <!-- Іконка пошуку -->
          <MagnifyingGlassIcon class="w-6 h-6 icon-stroke cursor-pointer hover:text-indigo-600 transition-colors duration-200" @click="searchComponent.openComponent()" />

          <!-- Іконка улюблених -->
          <NuxtLink to="/favorites"><HeartIcon class="w-6 h-6 icon-stroke heart-icon hover:text-red-600 transition-colors duration-200"/>
          </NuxtLink>

          <!-- Іконка кошика -->
          <div class="flex  heart-icon">
            <ShoppingBagIcon
                class="w-6 h-6 icon-stroke cursor-pointer hover:text-orange-600 transition-colors duration-200"
                @click="productBasketStore.toggleModal()"/>
            <div class="relative">
              <span class="absolute top-[-7px] left-[-3px] text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
            </div>
          </div>

        </div>
        <div v-if="!authStore.isLoggedIn" class="flex action-user gap-x-4 items-center">
          <NuxtLink to="/signup" class="flex items-center signup">{{ $t('navbar.signup') }}</NuxtLink>
          <NuxtLink to="/login" class="login bg-azure hover:bg-сerulean">{{ $t('navbar.login') }}</NuxtLink>
        </div>
        <div v-else class="action-user">
<!--          <NuxtLink @click="logout" to="#" class="flex items-center signup" >-->
<!--            <UserCircleIcon class="w-6 h-6 icon-stroke"/>-->
<!--          </NuxtLink>-->


          <button @click="toggleDropdown" class="flex items-center">
            <UserCircleIcon class="w-6 h-6 icon-stroke hover:text-azure transition-colors duration-200" />
          </button>
          <!-- Випадаючий список -->
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <NuxtLink to="/profile" class="dropdown-item" @click="isDropdownOpen = false">
              {{ $t('navbar.profile') }}
            </NuxtLink>
            <NuxtLink @click="logout" to="#" class="dropdown-item flex items-center signup" >
              {{ $t('navbar.logout') }}
            </NuxtLink>
          </div>
        </div>
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
import {useProductBasketStore} from "~/store/modals/basket.js";
import {useSearchComponentStore} from "~/store/components/search.js";

const authStore = useAuthStore();
const productBasketStore = useProductBasketStore();
const searchComponent = useSearchComponentStore();
const isDropdownOpen = ref(false);

onBeforeMount(() => {
  authStore.userData();
  productBasketStore.getData();
})

const emit = defineEmits(['toggleSlideOver'])
function emitOpenEvent() {
  emit('toggleSlideOver')
}


function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function logout() {
  authStore.logout()
  isDropdownOpen.value = false;
}

</script>

<style>
@import '@/assets/css/navbar.css';

.action-user {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 20;
  min-width: 150px;
  margin-top: 5px;
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  text-align: left;
  color: #374151;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}
</style>