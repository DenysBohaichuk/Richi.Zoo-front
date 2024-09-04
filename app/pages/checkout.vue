<template>
  <div class="bg-gray-50">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Checkout</h2>

      <form @submit.prevent="onSubmit" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">{{ $t('checkout.contact_information') }}</h2>
            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <UIFieldsInputField
                    type="text"
                    id="first-name"
                    name="first-name"
                    autocomplete="given-name"
                    label="Ім'я*"
                    required
                    v-model="firstNameValue"
                    :error="firstNameError"
                />
              </div>

              <div>
                <UIFieldsInputField
                    type="text"
                    id="last-name"
                    name="last-name"
                    autocomplete="family-name"
                    label="Прізвище*"
                    required
                    v-model="lastNameValue"
                    :error="lastNameError"
                />
              </div>

              <div class="sm:col-span-2">
                <UIFieldsInputField
                    id="phone"
                    type="tel"
                    label="Телефон*"
                    required
                    v-model="phoneValue"
                    :error="phoneError"
                />
              </div>

              <div class="sm:col-span-2">
                <UIFieldsInputField
                    type="email"
                    id="email-address"
                    name="email-address"
                    autocomplete="email"
                    label="Пошта"
                    v-model="emailValue"
                    :error="emailError"
                />
              </div>

              <div class="sm:col-span-2">

                <!-- Поле для вводу міста -->
                <UIFieldsInputField
                    label="Місто*"
                    id="city"
                    name="city"
                    type="text"
                    v-model="cityQuery"
                    :error="cityError"
                    @input="onCityInput"
                    placeholder="Почніть вводити місто"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    required
                />
                <ul
                    v-if="cities.length && showCityDropdown"
                    class="mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
                >
                  <li
                      v-for="city in cities"
                      :key="city.Ref"
                      @click="selectCity(city)"
                      class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >
                    {{ city.Description }}
                  </li>
                </ul>

              </div>
              <div class="sm:col-span-2">

                <!-- Поле для вибору відділення -->
                <UIFieldsInputField
                    label="Відділення*"
                    id="warehouse"
                    name="warehouse"
                    type="text"
                    v-model="warehouseInput"
                    :error="warehouseError"
                    @input="onWarehouseInput"
                    @focus="onWarehouseFocus"
                    @blur="onWarehouseBlur"
                    placeholder="Виберіть відділення"
                    autocomplete="off"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    :disabled="!selectedCity"
                    :class="{ 'bg-gray-100 cursor-not-allowed': !selectedCity }"
                    required
                />

                <ul
                    v-if="filteredWarehouses.length && showWarehouseDropdown"
                    class="mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
                >
                  <li
                      v-for="warehouse in filteredWarehouses"
                      :key="warehouse.Ref"
                      @mousedown.prevent="selectWarehouse(warehouse)"
                      class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >
                    {{ warehouse.Description }}
                  </li>
                </ul>


              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <RadioGroup v-model="selectedDeliveryMethod">
              <RadioGroupLabel class="text-lg font-medium text-gray-900">
                {{ $t('checkout.delivery_method_title') }}
              </RadioGroupLabel>

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods" :key="deliveryMethod.id"
                                  :value="deliveryMethod" v-slot="{ checked, active }">
                  <div
                      :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{
                            deliveryMethod.name
                          }}</RadioGroupLabel>
<RadioGroupDescription as="span" class="mt-2 text-sm text-gray-500">{{
    deliveryMethod.description
  }}</RadioGroupDescription>
                      </span>
                    </span>
                    <CheckCircleIcon v-if="checked" class="h-5 w-5 text-indigo-600" aria-hidden="true"/>
                    <span
                        :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                        aria-hidden="true"/>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
        </div>

        <!-- Order summary section -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-lg font-medium text-gray-900">{{ $t('checkout.order') }}</h2>

          <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="(product, productIdx) in products" :key="product.id" class="flex px-4 py-6 sm:px-6">
                <div class="flex-shrink-0">
                  <NuxtImg :src="product.images[0]" alt="image" class="w-20 rounded-md"/>
                </div>

                <div class="ml-6 flex flex-1 flex-col">
                  <div class="flex">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <NuxtLink :to="`/product/${product.id}`" class="font-medium text-gray-700 hover:text-gray-800">
                          {{ product.name }}
                        </NuxtLink>
                      </h4>
                      <ul class="mt-2 flex space-x-8">
                        <li v-for="(feature, index) in computeFeatureTypes(product)" :key="index" class="text-gray-500">
                          <div :class="{'border-l border-gray-200 pl-4': index !== 0}">
                            <h5 class="font-semibold text-sm text-gray-700">{{ feature.name }}</h5>
                            <p class="text-sm text-gray-600">{{ feature.value }}</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="ml-4 flow-root flex-shrink-0">
                      <button type="button" @click="removeFromBasket(product)"
                              class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Remove</span>
                        <TrashIcon class="h-5 w-5" aria-hidden="true"/>
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-1 items-end justify-between pt-2">
                    <p class="mt-1 text-sm font-medium text-gray-900">{{ product.price }} грн</p>

                    <div class="ml-4">
                      <label :for="`quantity-${productIdx}`" class="sr-only">Quantity, {{ product.name }}</label>
                      <select :id="`quantity-${productIdx}`" v-model="product.quantity"
                              @change="saveBasketToLocalStorage()"
                              class="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium">{{ $t('checkout.total') }}</dt>
                <dd class="text-base font-medium text-gray-900">{{ totalAmount }} грн</dd>
              </div>
            </dl>

            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button type="submit"
                      class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                {{ $t('checkout.confirm_order') }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import {RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue';
import {CheckCircleIcon, TrashIcon} from '@heroicons/vue/20/solid';
import {useCheckoutValidation} from '@/utils/forms/checkoutValidation.js';
import {
  removeFromBasket,
  saveBasketToLocalStorage,
  computeFeatureTypes,
  calculateTotalAmount
} from '@/utils/basketService.js';
import {useProductBasketStore} from '~/store/modals/basket.js';
import {
  cityQuery,
  cities,
  selectedCity,
  filteredWarehouses,
  selectedWarehouse,
  showCityDropdown,
  showWarehouseDropdown,
  onCityInput,
  selectCity,
  selectWarehouse,
  clearWarehouse,
  onWarehouseInput,
  warehouseInput,
  onWarehouseFocus,
  onWarehouseBlur
} from '~/composables/api/services/nova_poshta/cityWarehouseService.js';
import {apiMethods} from "~/composables/api/methods/apiMethods.js";

// Використовуємо store кошика
const productBasketStore = useProductBasketStore();
const products = computed(() => productBasketStore.productBasket);

// Використовуємо валідацію для форми
const {
  firstNameValue,
  firstNameError,
  lastNameValue,
  lastNameError,
  phoneValue,
  phoneError,
  emailValue,
  emailError,
  handleSubmit
} = useCheckoutValidation();

// Загальна сума замовлення
const totalAmount = computed(() => calculateTotalAmount(products.value));


// Функція для обробки відправки форми
function onSubmit() {
  handleSubmit(async () => {
    // Додаткова валідація для міста та відділення
    const cityError = !cityQuery.value ? 'Місто є обов\'язковим полем' : null;
    const warehouseError = !selectedWarehouse.value ? 'Відділення є обов\'язковим полем' : null;

    if (cityError || warehouseError) {
      console.error('Помилка валідації:', {cityError, warehouseError});
      return;
    }

    // Формуємо масив товарів для відправки
    const items = products.value.map(product => ({
      product_id: product.id,
      quantity: product.quantity
    }));

    // Якщо валідація пройдена успішно, формуємо payload
    const payload = {
      email: emailValue.value,
      name: firstNameValue.value,
      surname: lastNameValue.value,
      phone: phoneValue.value,
      cityRef: selectedCity.value.Ref,
      warehouseRef: selectedWarehouse.value.Ref,
      deliveryMethodId: selectedDeliveryMethod.value.id,
      products: items
    };

    console.log('Дані для відправки:', payload);

    try {
      const response = await apiMethods.createOrder(payload);

      if (response.status) {
        // Якщо статус true, очищаємо форму
        firstNameValue.value = '';
        lastNameValue.value = '';
        phoneValue.value = '';
        emailValue.value = '';
        cityQuery.value = '';
        clearWarehouse();
        products.value.forEach((product) => {
          removeFromBasket(product)
        })
        navigateTo('/');
        createFlashAlert('success', response.data.message); // або показати повідомлення користувачеві іншим способом
      } else {
        // Якщо статус false, виводимо повідомлення про помилку
         console.error('Помилка сервера:', response.data.message);
        createFlashAlert('error', response.data.message); // або показати повідомлення користувачеві іншим способом
      }
    } catch (error) {
      console.error('Помилка відправки даних:', error);
      createFlashAlert('error', 'Сталася помилка при відправці замовлення');
    }
  })();
}

// Завантаження методів доставки при монтовані компонента
const deliveryMethods = ref([]);
const selectedDeliveryMethod = ref(null);

onMounted(async () => {
  try {
    const response = await apiMethods.getDeliveryMethods();
    if (response.status) {
      deliveryMethods.value = response.data;
      selectedDeliveryMethod.value = deliveryMethods.value[0];
    } else {
      console.error('Не вдалося завантажити методи доставки');
    }
  } catch (error) {
    console.error('Помилка при отриманні методів доставки:', error);
  }
});
onBeforeUnmount(() => {
  cityQuery.value = '';
  selectedCity.value = null;
  warehouseInput.value = '';
  selectedWarehouse.value = null;
  clearWarehouse();
});
// Спостерігаємо за зміною запиту міста
watch(cityQuery, (newVal) => {
  if (!newVal) {
    clearWarehouse();
  }
});
</script>

