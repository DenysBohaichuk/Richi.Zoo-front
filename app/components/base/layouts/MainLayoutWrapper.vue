<template>
  <div>
    <BaseLoaderPageLoadKakiDog v-show="waitLoadPage" :opacity="'100'" :bgColor="'white'"/>
    <NuxtLoadingIndicator/>

    <div>
      <BaseNavbarNavBar class="border-b border-r border-gray-200 text-lg leading-none"
                        @toggleSlideOver="toggleSlideOver"/>

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


      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg block md:hidden">
        <nav class="flex justify-around items-center py-2 relative">

          <!-- Перша іконка -->
          <NuxtLink to="/favorites" class="flex flex-col items-center text-gray-500">
            <HeartIcon class="w-6 h-6 icon-stroke heart-icon hover:text-red-600 transition-colors duration-200"/>
          </NuxtLink>

          <!-- Центральна іконка (з поворотом при натисканні) -->
          <div id="central-button-container" class="-top-3 bg-white p-2 rounded-full border border-gray-300 shadow-lg relative">
            <NuxtLink to="#"
                      id="central-button"
                      class="flex items-center justify-center transform transition-transform duration-300 rotate-0 cursor-pointer bg-white">
              <Squares2X2Icon class="w-6 h-6 icon-stroke heart-icon" />
            </NuxtLink>

            <!-- Кружечки з назвами як категорії тварин -->
            <!-- Динамічні кружечки для категорій -->
            <div v-for="(category, index) in categories" :key="category.id" class="animal" :class="'animal-' + category.slug">
              <NuxtLink :to="'/category/' + category.slug" >
              <img :src="category.icon" :alt="category.name" class="w-6 h-6">
              </NuxtLink>
            </div>
          </div>


          <!-- Третя іконка -->
          <NuxtLink to="/checkout" class="flex flex-col items-center text-gray-500">
            <ShoppingBagIcon class="w-6 h-6 icon-stroke heart-icon cursor-pointer hover:text-orange-600"/>
          </NuxtLink>

        </nav>
      </div>


    </div>
    <BaseSidebarSideBar :open="open" @toggleSlideOver="toggleSlideOver"/>

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
import {useLoading, useToggle} from '~/mixins/MixinCommon.js';
import {useNavbarStore} from "~/store/components/navbar.js";
import { getDataFromStore } from '~/mixins/MixinNavbarCategories.js';
import {HeartIcon, ShoppingBagIcon, Squares2X2Icon} from "@heroicons/vue/24/outline/index.js";


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

const {open, toggleSlideOver} = useToggle();
const {waitLoadPage} = useLoading();
const data = await getDataFromStore();
const categories = ref([]);
categories.value = data.categoriesDropdown;



onMounted(() => {
  const button = document.getElementById('central-button');
  const container = document.getElementById('central-button-container');

  // Функція для переключення стану кнопки
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Зупиняємо перенаправлення

    // Тогл класу активного стану
    button.classList.toggle('active');
    container.classList.toggle('expand');

    // Зупиняємо поширення події "click", щоб клік по кнопці не був оброблений як клік по документу
    event.stopPropagation();
  });

  // Додаємо обробник події на документ для того, щоб закрити кнопку при натисканні поза нею
  document.addEventListener('click', function() {
    if (button.classList.contains('active')) {
      // Видаляємо клас активності і повертаємо кнопку до початкового стану
      button.classList.remove('active');
      container.classList.remove('expand');
    }
  });
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

#central-button {
  background-color: white; /* Початковий колір кнопки */
  transform: rotate(0deg);
}

#central-button.active {
  color: green; /* Колір після натиску */
  transform: rotate(190deg);
}


.animal {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: lightgray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
}

.expand .animal {
  opacity: 1;
  transform: scale(1);
}

/* Динамічні позиції для кожної категорії */
.expand .animal-koty { transform: translate(-103px, -60px) scale(1); }
.expand .animal-sobaky { transform: translate(-82px, -100px) scale(1); }
.expand .animal-gryzuny { transform: translate(-44px, -130px) scale(1); }
.expand .animal-ptakhy { transform: translate(3px, -130px) scale(1); }
.expand .animal-ryby { transform: translate(41px, -100px) scale(1); }
.expand .animal-reptylii { transform: translate(62px, -60px) scale(1); }




</style>
