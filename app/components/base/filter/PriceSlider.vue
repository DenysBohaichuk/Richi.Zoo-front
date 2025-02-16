<template>
  <div class="px-4 py-6">
    <h3 class="text-gray-900 font-medium">Ціновий діапазон</h3>

    <!-- Слайдер -->
    <VueSlider
        v-model="priceRange"
        :min="minPrice"
        :max="maxPrice"
        :tooltip="'none'"
        :dot-size="16"
        :height="6"
        :rail-style="{ backgroundColor: '#E5E7EB', height: '6px' }"
        :process-style="{ backgroundColor: '#5BA9D9', height: '6px' }"
        class="slider"
    />

    <div class="flex justify-between text-sm text-gray-700 mt-3 mb-2">
        <!-- Поле для мінімальної ціни -->
        <InputField
            id="min-price"
            label="Мін. ціна"
            type="number"
            v-model="priceRange[0]"
            :error="priceError"
        />

        <!-- Поле для максимальної ціни -->
        <InputField
            id="max-price"
            label="Макс. ціна"
            type="number"
            v-model="priceRange[1]"
            :error="priceError"
        />
    </div>


  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import InputField from "~/components/base/fields/InputField.vue";

const props = defineProps({
  minPrice: { type: Number, default: 0 },
  maxPrice: { type: Number, default: 20000 },
  modelValue: { type: Array, default: () => [0, 20000] }
});

const emit = defineEmits(['update:modelValue']);

const priceRange = ref([...props.modelValue]);
const priceError = ref("");

let debounceTimer = null;

// Функція для перевірки діапазону ціни
const validatePrice = () => {
  if (priceRange.value[0] > priceRange.value[1]) {
    priceError.value = "Мінімальна ціна не може бути більшою за максимальну";
  } else {
    priceError.value = "";
  }
};

// Оновлення значень з debounce (1.5 сек)
watch(priceRange, (newValue) => {
  validatePrice();
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    if (!priceError.value) {
      emit('update:modelValue', newValue);
    }
  }, 1500);
}, { deep: true });

</script>

<style>
/* Додаткові стилі для адаптації під Tailwind */
.slider {
  --slider-connect-bg: theme('colors.blue.500');
  --slider-tooltip-bg: theme('colors.gray.800');
  --slider-handle-bg: theme('colors.blue.500');
}
</style>
