<template>
  <!--мобільне меню-->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg block md:hidden">
    <nav class="flex justify-around items-center py-2 relative">
      <!-- Перша іконка -->
      <NuxtLink to="/favorites" class="flex flex-col items-center text-gray-500">
        <HeartIcon class="w-6 h-6 icon-stroke heart-icon hover:text-red-600 transition-colors duration-200"/>
      </NuxtLink>

      <!-- Центральна іконка (з поворотом при натисканні) -->
      <div id="central-button-container" class="bg-white p-2 rounded-full border border-gray-300 shadow-lg relative">
        <NuxtLink to="#"
                  id="central-button"
                  class="flex items-center justify-center transform transition-transform duration-700 rotate-0 cursor-pointer bg-white text-gray-500">
          <Squares2X2Icon class="w-6 h-6 icon-stroke heart-icon" />
        </NuxtLink>

        <!-- Кружечки з назвами як категорії тварин -->
        <!-- Динамічні кружечки для категорій -->
        <div v-for="(category, index) in categories" :key="category.id" class="animal bg-white" :class="'animal-' + category.slug">
          <NuxtLink :to="'/category/' + category.slug" >
            <img :src="category.icon" :alt="category.name" class="w-6 h-6">
          </NuxtLink>
        </div>
      </div>

      <!-- Третя іконка -->
      <ShoppingBagIcon class="w-6 h-6 icon-stroke heart-icon cursor-pointer hover:text-orange-600 text-gray-500" @click="productBasketStore.toggleModal()"/>
    </nav>
  </div>
</template>

<script setup>

import {HeartIcon, ShoppingBagIcon, Squares2X2Icon} from "@heroicons/vue/24/outline/index";
import {useProductBasketStore} from "~/store/modals/basket.js";
import {getDataFromStore} from "~/mixins/MixinNavbarCategories";
import {useMobileMenuStore} from "~/store/components/mobileMenu.js";

const productBasketStore = useProductBasketStore();
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

    const overlay = document.getElementById('overlay');
    // Перевіряємо, чи затемнення активне, і перемикаємо його стан
    if (overlay.classList.contains('translate-y-full')) {
      overlay.classList.remove('translate-y-full', 'opacity-0'); // Показуємо
      overlay.classList.add('translate-y-0', 'opacity-100');
    } else {
      overlay.classList.remove('translate-y-0', 'opacity-100'); // Приховуємо
      overlay.classList.add('translate-y-full', 'opacity-0');
    }

    // Зупиняємо поширення події "click", щоб клік по кнопці не був оброблений як клік по документу
    event.stopPropagation();
  });

  // Додаємо обробник події на документ для того, щоб закрити кнопку при натисканні поза нею
  document.addEventListener('click', function() {
    if (button.classList.contains('active')) {
      // Видаляємо клас активності і повертаємо кнопку до початкового стану
      button.classList.remove('active');
      container.classList.remove('expand');

      const overlay = document.getElementById('overlay');

      overlay.classList.remove('translate-y-0', 'opacity-100'); // Приховуємо
      overlay.classList.add('translate-y-full', 'opacity-0');
    }
  });
});

const menuVisibilityStore = useMobileMenuStore();


</script>

<style scoped>
#central-button {
  background-color: white; /* Початковий колір кнопки */
  transform: rotate(0deg);
}

#central-button.active {
  color: green; /* Колір після натиску */
  transform: rotate(180deg);
}


.animal {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-out;
}

.expand .animal {
  opacity: 1;
  transform: scale(1);
}

/* Динамічні позиції для кожної категорії */
.expand .animal-koty {
  transform: translate(-103px, -75px) scale(1);
  transition-delay: 0s;
}

.expand .animal-sobaky {
  transform: translate(-82px, -115px) scale(1);
  transition-delay: 0.1s;
}

.expand .animal-gryzuny {
  transform: translate(-44px, -145px) scale(1);
  transition-delay: 0.2s;
}

.expand .animal-ptakhy {
  transform: translate(3px, -145px) scale(1);
  transition-delay: 0.3s;
}

.expand .animal-ryby {
  transform: translate(41px, -115px) scale(1);
  transition-delay: 0.4s;
}

.expand .animal-reptylii {
  transform: translate(62px, -75px) scale(1);
  transition-delay: 0.5s;
}

</style>