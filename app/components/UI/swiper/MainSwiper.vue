<template>
  <swiper
      :pagination="{
      dynamicBullets: true,
    }"
      :modules="modules"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :autoplay="{ delay: 5000 }"
      :loop="true"
      class="mySwiper"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
    <div class="swiper-button-prev flex justify-center items-center"><img src="@/assets/img/Expand_left_light.png" class="swiper-left-arrow"/></div>
    <div class="swiper-button-next flex justify-center items-center"><img src="@/assets/img/Expand_right_light.png" class="swiper-right-arrow"/></div>
  </swiper>
</template>

<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import '@/assets/css/swiper.css';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const modules = [Pagination, Navigation, Autoplay];
</script>



<style scoped>
.swiper-button-prev,
.swiper-button-next {
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  width: 44px;
  height: inherit;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(0, 0, 0, 0.2);
}

.swiper-left-arrow, .swiper-right-arrow{
  opacity: 0.5;
}
.swiper-button-prev:hover .swiper-left-arrow,
.swiper-button-next:hover .swiper-right-arrow{
  opacity: 1;
}


.swiper-button-prev {
  left: 0;
}
.swiper-button-next {
  right: 0;
}

.mySwiper .swiper-button-prev:after,
.mySwiper .swiper-button-next:after {
  display: none; /* Сховайте стандартні стрілки */
}

</style>