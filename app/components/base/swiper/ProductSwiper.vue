<template>
  <div class="flex flex-col">
    <swiper
        @slide-change="onSlideChange"
        :spaceBetween="10"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2 aspect-h-1 aspect-w-1 w-full"
    >
      <swiper-slide
          v-for="(image, index) in images"
          :key="index"
          class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
      >
        <img class="h-full w-full object-cover object-center" :src="image" />
      </swiper-slide>
    </swiper>
    <swiper
        @swiper="setThumbsSwiper"
        @tap="onSlideChange"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :watchSlidesVisibility="true"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide
          v-for="(image, index) in images"
          :key="index"
          class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
      >
        <img class="h-full w-full object-cover object-center" :src="image" />
        <span
            :class="[activeIndex === index ? 'ring-indigo-500' : 'ring-transparent', 'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2']"
            aria-hidden="true"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs, Controller } from 'swiper/modules';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const thumbsSwiper = ref(null);
const activeIndex = ref(0);

const setThumbsSwiper = (swiper) => {
  if (swiper) {
    thumbsSwiper.value = swiper;
  }
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.clickedIndex !== undefined ? swiper.clickedIndex : swiper.activeIndex;
};

const modules = [FreeMode, Thumbs, Controller];
</script>



<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Центрування тексту на слайді вертикально */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: auto; /* Зберігаємо пропорції зображення */
  height: 100%; /* Зменшуємо висоту, щоб вона відповідала контейнеру */
  object-fit: contain; /* Забезпечуємо правильне масштабування та розміщення зображення */
}

.mySwiper2 {
  height: 300px; /* Фіксована висота для головного зображення */
  width: 100%;
}

.mySwiper {
  height: 100px; /* Фіксована висота для мініатюр */
  box-sizing: border-box;
  padding: 10px 10px;
}

.mySwiper .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper .swiper-slide-thumb-active {
  opacity: 1;
}
</style>


