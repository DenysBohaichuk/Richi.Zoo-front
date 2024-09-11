<template>
  <ClientOnly>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeAndClear">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                         leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 block bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <div class="fixed inset-0 flex items-start justify-center z-50">
          <div class="mt-10 w-full max-w-xl px-4">
            <div class="relative">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-105"
                               enter-to="opacity-100 scale-100" leave="ease-in duration-200"
                               leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-105">
                <DialogPanel class="w-full flex flex-col transform text-left text-base transition my-8">
                  <input
                      v-model="query"
                      @input="handleInput"
                      type="text"
                      :placeholder="$t('component.search_placeholder')"
                      class="w-full px-6 py-3 text-lg border border-gray-300 rounded-full shadow-lg focus:outline-none bg-white"
                  />
                  <ul v-if="results.length"
                      class="absolute top-full left-0 right-0 bg-white shadow-lg rounded-3xl mt-1 z-10 overflow-auto max-h-80">
                    <li
                        v-for="(result, index) in results"
                        :key="index"
                        class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                        @click="selectAndRedirect(result.id)"
                    >
                      <div class="flex-1 block">
                        <h2 class="text-sm font-medium text-gray-900">{{ result.name }}</h2>
                        <p v-if="result.barcode" class="text-xs text-gray-500">Штрих-код: {{ result.barcode }}</p>
                        <p class="text-sm text-gray-900">{{ result.price }} грн</p>
                      </div>
                    </li>
                  </ul>
                  <div v-else
                       class="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl mt-1 z-10 overflow-auto max-h-80">
                    <p class="px-4 py-2">Нажаль ми нічого не знайшли :(</p>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {useSearchComponentStore} from "~/store/components/search.js";
import {apiMethods} from "~/composables/api/methods/apiMethods.js";

const searchComponent = useSearchComponentStore()
const open = computed(() => searchComponent.open);
const router = useRouter();

const query = ref('')
const results = ref([])
let searchTimeout = null;

const closeAndClear = () => {
  searchComponent.closeComponent();
  query.value = '';
  results.value = [];
}

const handleInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(onSearch, 500); // Затримка 0.5 секунди перед виконанням пошуку
}

const onSearch = async () => {
  if (query.value) {
    const response = await apiMethods.getProductsBySearch(query.value)
    results.value = response.data; // Якщо дані вже у форматі JSON
  } else {
    results.value = []
  }
}

const selectAndRedirect = (productId) => {
  closeAndClear(); // Закриваємо пошук
  router.push(`/product/${productId}`); // Перенаправлення на сторінку товару
}
</script>

<style scoped>

li {
  display: flex;
  align-items: center;
}

li:hover {
  background-color: #f5f5f5;
}

input {
  border-radius: 50px; /* Закруглені краї */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Додаємо тінь */
  margin-bottom: 0.5rem; /* Відступ знизу */
}
</style>
