<template>
  <div>
<!-- v3.12   <NuxtRouteAnnouncer />-->
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { createFlashAlert, closeAlert } from '~/utils/alerts.js';

if (typeof window !== 'undefined') {
  window.createFlashAlert = createFlashAlert;
  window.closeAlert = closeAlert;
}
</script>
<style>
@import url("assets/css/components/alerts.css");


.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>