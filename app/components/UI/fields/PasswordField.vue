<template>
  <div class="relative">
    <label :for="id"
           class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-grey"
           :class="{ 'text-red-400': error }"
    >{{ label }}</label>
    <input name="password"
           :id="id"
           :type="showPassword ? 'text' : 'password'"
           :value="modelValue"
           @input="updateValue"
           class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-grey shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 focus:outline-none focus:ring-azure"
           :class="error ? 'pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500' : ''"

           :placeholder="label"
           :required="required"
    />
    <div
        class="pointer-events-auto absolute inset-y-0 right-0 flex items-center pr-3"
        @click="toggleShow">
      <LockClosedIcon
          v-if="!showPassword"
          :class="{ 'text-red-400': error }"
          class="h-5 w-5 cursor-pointer text-gray-400"
          aria-hidden="true"
      />
      <LockOpenIcon
          v-else
          :class="{ 'text-red-400': error }"
          class="h-5 w-5  cursor-pointer text-gray-400"
          aria-hidden="true"
      />
    </div>
  </div>
  <span v-if="error"
        :class="{ 'text-red-400': error }"
        class="block pt-1"
  >{{ error }}</span>
</template>


<script setup>

import {LockClosedIcon, LockOpenIcon} from "@heroicons/vue/24/outline";
import {defineProps, defineEmits, ref} from "vue";

const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

defineProps({
  label: String,
  id: String,
  type: String,
  required: Boolean,
  modelValue: String,
  error: String,
});

const emit = defineEmits(['update:modelValue'])


const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

</script>


<style scoped>

</style>