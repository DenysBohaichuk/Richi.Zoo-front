<script setup>
import {ref} from "vue";
import {getDataFromStore} from "~/mixins/MixinNavbarCategories";

const categories = ref([]);
console.log(2)
const data = await getDataFromStore();
categories.value = data.categoriesDropdown;
</script>

<template>
  <footer class="bg-gray-300 text-white py-10">
    <div class="container mx-auto px-4">
      <!-- Логотип і меню футера -->
      <div class="flex flex-col md:flex-row md:justify-between items-center mb-8">
        <!-- Логотип -->
        <div class="mb-6 md:mb-0 h-16">
          <NuxtLink to="/" class="h-full" nuxt-client>
            <LazyBaseLogoHBL3 class="h-full"></LazyBaseLogoHBL3>
          </NuxtLink>
        </div>

        <!-- Меню футера -->
        <ul class="flex flex-wrap justify-center space-x-6 md:space-x-10 mb-8 md:mb-0 text-sm md:text-base">
<!--          <NuxtLink-->
<!--              v-for="category in categories"-->
<!--              :key="category.name"-->
<!--              :to="`/category/${category.slug}`"-->
<!--              class="flex gap-x-4 p-2 text-sm font-semibold leading-6 text-gray-900 hover:text-cerulean hover:bg-slate-100 transition-colors duration-200"-->
<!--          >-->
            <!--              :class="{ 'bg-slate-100 text-cerulean': activeCategory === category }"-->
<!--            <li><a href="/category/No Name" class="hover:underline">No Name</a></li>-->
            <li v-for="category in categories"
                :key="category.name">
              <NuxtLink
                  :to="`/category/${category.slug}`"
                  class="flex gap-x-4 p-2 text-sm font-semibold leading-6 text-white hover:text-cerulean transition-colors duration-200"
              >
                {{ category.name }}
              </NuxtLink>
            </li>
        </ul>
      </div>

      <!-- Інші секції футера -->
      <!--      <div class="flex flex-col md:flex-row md:justify-between items-center mb-8">
              &lt;!&ndash; Логотип та соціальні іконки для мобільних &ndash;&gt;
              <div class="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <a href="https://www.instagram.com/joly.official/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gray-200 mb-4">
                  <svg class="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="..." />
                  </svg>
                </a>
                <img src="#" alt="JolyBell logo" class="h-10">
              </div>

              &lt;!&ndash; Контактна інформація &ndash;&gt;
              <div class="text-center md:text-left text-sm md:text-base mb-4 md:mb-0">
                <p><span class="font-semibold">E-mail:</span> support@jolybell.com</p>
                <p class="mt-2"><span class="font-semibold">Время работы службы поддержки:</span><br> ПН-ПТ: 9:00 - 21:00</p>
              </div>

              &lt;!&ndash; Способи оплати &ndash;&gt;
              <div class="text-center md:text-left">
                <span class="font-semibold">Принимаем к оплате:</span>
                <div class="flex justify-center md:justify-start space-x-4 mt-2">
      &lt;!&ndash;            <img src="/img/footer/visa.png" alt="Visa" class="h-6 md:h-8">
                  <img src="/img/footer/wayforpay.png" alt="Wayforpay" class="h-6 md:h-8">
                  <img src="/img/footer/mastercard.png" alt="Mastercard" class="h-6 md:h-8">
                  <img src="/img/footer/privat24.png" alt="Privat24" class="h-6 md:h-8">&ndash;&gt;
                </div>
              </div>
            </div>

            &lt;!&ndash; Права та публічна оферта &ndash;&gt;
            <div class="flex flex-col md:flex-row md:justify-between items-center text-sm md:text-base">
              <div class="mb-4 md:mb-0 text-center">
                © 2024, JolyBell.com
              </div>

              <a href="/public_offer_2.pdf" class="hover:underline text-center" target="_blank" rel="noopener noreferrer">Публичная оферта</a>
            </div>

            &lt;!&ndash; Доставка &ndash;&gt;
            <div class="text-center text-sm md:text-base mt-8">
              Доставка по Украине осуществляется службой доставки: Новая Почта.
              <br>
              Доставляем по всему миру службой доставки: Укр Почта, Новая Почта.
            </div>-->
    </div>
  </footer>

</template>

<style scoped>

</style>