<script setup>
defineProps({
  text: String
});
</script>

<template>
  <button type="submit" class="rounded-[15px] bg-azure hover:bg-сerulean w-max py-[7px] px-[21px] text-white">
    {{ text }}
  </button>
</template>

<style scoped>

</style>