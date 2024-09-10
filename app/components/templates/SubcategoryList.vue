<template>
  <div class="relative mt-8">
    <div class="relative -mb-6 w-full p-6">
      <ul role="list" class="mx-4 grid sm:mx-6 lg:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:space-x-0 gap-4">
        <li v-for="subcategory in subcategories" :key="subcategory.id" class="w-64 text-center lg:w-auto hover:shadow-[0_0px_8px_1px_rgb(0,0,0,0.2)] rounded-[15px]">
          <div class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full h-[240px] overflow-hidden rounded-md flex justify-center p-3">
              <NuxtImg :src="subcategory.image" alt="Image" class="h-full object-cover object-center group-hover:opacity-75" />
            </div>
            <div class="min-h-10 flex justify-center items-center">
              <h3 class="mt-1 font-semibold text-gray-900">
                <NuxtLink :to="subcategory.slug">
                  <span class="absolute inset-0"></span>
                  {{ subcategory.name }}
                </NuxtLink>
              </h3>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subcategories: Array
});
</script>
