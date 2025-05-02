<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="modalInfoStore.closeModal()">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none " @click="modalInfoStore.closeModal()">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full" :class="[status ? ' bg-green-100' : ' bg-red-100']">

                  <component :is="iconComponent" class="h-6 w-6" :class="[status ? 'text-green-600' : 'text-red-600']" aria-hidden="true" />

                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle  as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ message }}</DialogTitle>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <div
                    class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none"
                    :class="status ? 'bg-azure hover:bg-сerulean' : 'bg-red-500 hover:bg-red-400'"
                    @click="modalInfoStore.closeModal()"
                >Ок</div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useModalInfoStore } from '~/store/modals/info.js';

const modalInfoStore = useModalInfoStore();

const open = computed(() => modalInfoStore.open);
const status = computed(() => modalInfoStore.status);
const message = computed(() => modalInfoStore.message);

const iconComponent = computed(() => status ? CheckIcon : XMarkIcon);

</script>