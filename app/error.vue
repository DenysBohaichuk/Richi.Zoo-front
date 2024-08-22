<template>
  <NuxtLayout>

    <main class="container">
      <div class="text-center py-6 px-12 bg-white rounded-2xl">
        <p class="text-base font-semibold text-red-700">{{err.statusCode}}</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{{err.message}}</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">{{descError}}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="/"
             class="rounded-[15px] bg-сerulean px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-сerulean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-сerulean">Go
            back home</a>
          <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span
              aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </main>

  </NuxtLayout>
</template>

<script setup>
const err = useError();
let descError = '';
if(err.value.statusCode === 404){
  descError = 'Вибачте, ми не змогли знайти сторінку, яку ви шукаєте.';
}
console.log(err)
</script>

<style scoped>
@import "@/assets/css/mountains_background.css";
</style>

