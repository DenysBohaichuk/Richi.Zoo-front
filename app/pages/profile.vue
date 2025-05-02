<template>
  <BaseUserIsAuthUser redirect-path="/login">
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Контейнер із відступами -->
      <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <!-- Заголовок -->
        <h1 class="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
          {{ $t('profile.title') }}
        </h1>

        <!-- Вкладки -->
        <!-- Для десктопу: горизонтальні вкладки -->
        <div class="hidden sm:flex border-b border-gray-200 mb-6">
          <NuxtLink
              v-for="tab in tabs"
              :key="tab.id"
              :to="{ query: { tab: tab.id } }"
              :class="[
            'px-4 py-2 text-base font-medium whitespace-nowrap',
            activeTab === tab.id
              ? 'border-b-2 border-azure text-azure'
              : 'text-gray-500 hover:text-gray-700'
          ]"
              :aria-label="`Перейти до вкладки ${tab.name}`"
          >
            {{ tab.name }}
          </NuxtLink>
        </div>

        <!-- Для мобілки: випадаючий список -->
        <div class="sm:hidden mb-6">
          <label for="tab-select" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('profile.selectSection') }}
          </label>
          <select
              id="tab-select"
              v-model="activeTab"
              @change="updateTabFromSelect"
              class="block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
          >
            <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
              {{ tab.name }}
            </option>
          </select>
        </div>

        <!-- Вміст вкладок -->
        <div class="tab-content flex-1">
          <!-- Вкладка: Особисті дані -->
          <div v-if="activeTab === 'personal'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  {{ $t('profile.personal.name') }}
                </label>
                <input
                    v-model="userData.name"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                    :disabled="!isEditing"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  {{ $t('profile.personal.surname') }}
                </label>
                <input
                    v-model="userData.surname"
                    type="text"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                    :disabled="!isEditing"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  {{ $t('profile.personal.email') }}
                </label>
                <input
                    v-model="userData.email"
                    type="email"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                    :disabled="!isEditing"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  {{ $t('profile.personal.phone') }}
                </label>
                <input
                    v-model="userData.phone"
                    type="tel"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                    :disabled="!isEditing"
                />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                  v-if="!isEditing"
                  @click="isEditing = true"
                  class="bg-azure text-white px-4 py-2 rounded-md hover:bg-cerulean transition-colors duration-200 w-full sm:w-auto"
              >
                {{ $t('profile.personal.edit') }}
              </button>
              <template v-else>
                <button
                    @click="saveProfile"
                    class="bg-azure text-white px-4 py-2 rounded-md hover:bg-cerulean transition-colors duration-200 w-full sm:w-auto"
                >
                  {{ $t('profile.personal.save') }}
                </button>
                <button
                    @click="isEditing = false"
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 w-full sm:w-auto"
                >
                  {{ $t('profile.personal.cancel') }}
                </button>
              </template>
            </div>
          </div>

          <!-- Вкладка: Мої замовлення -->
          <div v-if="activeTab === 'orders'" class="space-y-4">
            <div v-if="orders.length === 0" class="text-gray-500 text-center py-6">
              {{ $t('profile.orders.empty') }}
            </div>
            <div v-else class="space-y-4">
              <div
                  v-for="order in orders"
                  :key="order.id"
                  class="border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div>
                  <p class="font-medium text-gray-900">
                    {{ $t('profile.orders.order') }} #{{ order.id }}
                  </p>
                  <p class="text-sm text-gray-500">{{ order.date }}</p>
                  <p class="text-sm text-gray-700">
                    {{ $t('profile.orders.status') }}: {{ order.status }}
                  </p>
                </div>
                <div class="text-left sm:text-right">
                  <p class="font-medium text-gray-900">
                    {{ order.total }} {{ $t('profile.orders.currency') }}
                  </p>
                  <NuxtLink
                      :to="`/order/${order.id}`"
                      class="text-azure hover:underline text-sm"
                  >
                    {{ $t('profile.orders.details') }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Вкладка: Налаштування -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <div class="space-y-6">
              <!-- Зміна пароля -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    {{ $t('profile.settings.currentPassword') }}
                  </label>
                  <input
                      v-model="passwordData.currentPassword"
                      type="password"
                      class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    {{ $t('profile.settings.newPassword') }}
                  </label>
                  <input
                      v-model="passwordData.newPassword"
                      type="password"
                      class="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-azure focus:border-azure"
                  />
                </div>
              </div>
              <button
                  @click="changePassword"
                  class="bg-azure text-white px-4 py-2 rounded-md hover:bg-cerulean transition-colors duration-200 w-full sm:w-auto"
              >
                {{ $t('profile.settings.changePassword') }}
              </button>

              <!-- Налаштування сповіщень -->
              <div class="mt-6">
                <label class="flex items-center">
                  <input
                      type="checkbox"
                      v-model="settingsData.emailNotifications"
                      class="h-4 w-4 text-azure border-gray-300 rounded focus:ring-azure"
                  />
                  <span class="ml-2 text-sm text-gray-700">
                  {{ $t('profile.settings.emailNotifications') }}
                </span>
                </label>
              </div>
              <button
                  @click="saveSettings"
                  class="mt-4 bg-azure text-white px-4 py-2 rounded-md hover:bg-cerulean transition-colors duration-200 w-full sm:w-auto"
              >
                {{ $t('profile.settings.saveSettings') }}
              </button>

              <!-- Кнопка виходу -->
              <div class="mt-6">
                <button
                    @click="logout"
                    class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto"
                >
                  {{ $t('profile.settings.logout') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Вкладка: Мої відгуки -->
          <div v-if="activeTab === 'reviews'" class="space-y-4">
            <div v-if="reviews.length === 0" class="text-gray-500 text-center py-6">
              {{ $t('profile.reviews.empty') }}
            </div>
            <div v-else class="space-y-4">
              <div
                  v-for="review in reviews"
                  :key="review.id"
                  class="border border-gray-200 rounded-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
              >
                <div>
                  <p class="font-medium text-gray-900">{{ review.product }}</p>
                  <p class="text-sm text-gray-500">{{ review.date }}</p>
                  <p class="text-sm text-gray-700">
                    {{ $t('profile.reviews.rating') }}: {{ review.rating }}/5
                  </p>
                  <p class="text-gray-600">{{ review.comment }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-2">
                  <button class="text-azure hover:underline text-sm">
                    {{ $t('profile.reviews.edit') }}
                  </button>
                  <button
                      @click="deleteReview(review.id)"
                      class="text-red-500 hover:underline text-sm"
                  >
                    {{ $t('profile.reviews.delete') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Вкладка: Бонуси/знижки -->
          <div v-if="activeTab === 'bonuses'" class="space-y-6">
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {{ $t('profile.bonuses.title') }}
                </h3>
                <p class="text-gray-700">
                  {{ $t('profile.bonuses.available') }}: {{ bonuses.points }}
                  {{ $t('profile.bonuses.points') }}
                </p>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {{ $t('profile.bonuses.promoCodes') }}
                </h3>
                <div v-if="promoCodes.length === 0" class="text-gray-500 text-center py-6">
                  {{ $t('profile.bonuses.noPromoCodes') }}
                </div>
                <div v-else class="space-y-4">
                  <div
                      v-for="code in promoCodes"
                      :key="code.id"
                      class="border border-gray-200 rounded-md p-4"
                  >
                    <p class="text-gray-900">
                      {{ $t('profile.bonuses.code') }}: <span class="font-medium">{{ code.code }}</span>
                    </p>
                    <p class="text-gray-700">
                      {{ $t('profile.bonuses.discount') }}: {{ code.discount }}%
                    </p>
                    <p class="text-gray-700">
                      {{ $t('profile.bonuses.expires') }}: {{ code.expires }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseUserIsAuthUser>
</template>

<script setup>
import {ref, onMounted, watch, onBeforeUnmount} from 'vue';
import {useAuthStore} from '~/store/user/auth.js';
import {useI18n} from 'vue-i18n';
import {useRoute, useRouter} from 'vue-router';

definePageMeta({
  middleware: 'is-auth',
  layout: 'default',
});

const authStore = useAuthStore();
const {t} = useI18n();
const route = useRoute();
const router = useRouter();

// Вкладки
const tabs = ref([]);
const activeTab = ref('personal');
let isOnProfilePage = ref(true); // Відстежуємо, чи ми на сторінці профілю

onMounted(() => {
  // Перевірка авторизації
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }

  // Ініціалізуємо вкладки
  tabs.value = [
    {id: 'personal', name: t('profile.tabs.personal')},
    {id: 'orders', name: t('profile.tabs.orders')},
    {id: 'settings', name: t('profile.tabs.settings')},
    {id: 'reviews', name: t('profile.tabs.reviews')},
    {id: 'bonuses', name: t('profile.tabs.bonuses')},
  ];

  // Отримуємо активну вкладку з URL
  const tabFromUrl = route.query.tab;
  if (tabFromUrl && tabs.value.some(tab => tab.id === tabFromUrl)) {
    activeTab.value = tabFromUrl;
  }
});

// Оновлення URL лише якщо ми на сторінці профілю
watch(activeTab, (newTab) => {
  if (isOnProfilePage.value) {
    router.push({query: {tab: newTab}});
  }
});

// Оновлення activeTab при зміні URL
watch(
    () => route.query.tab,
    (newTab) => {
      if (newTab && tabs.value.some(tab => tab.id === newTab)) {
        activeTab.value = newTab;
      } else {
        activeTab.value = 'personal'; // За замовчуванням
      }
    }
);

// Відстежуємо зміну маршруту
watch(
    () => route.path,
    (newPath) => {
      isOnProfilePage.value = newPath === '/profile';
      if (!isOnProfilePage.value) {
        router.replace({query: {}});
      }
    }
);

// Очищаємо параметри при знищенні компонента
onBeforeUnmount(() => {
  isOnProfilePage.value = false;
  router.replace({query: {}});
});

// Оновлення URL при виборі вкладки з випадаючого списку
const updateTabFromSelect = () => {
  router.push({query: {tab: activeTab.value}});
};

// Функція виходу з акаунту
const logout = async () => {
  try {
    // Очищаємо токен і стан авторизації у authStore
    await authStore.logout();
    // Перенаправляємо на сторінку входу
    router.push('/login');
  } catch (error) {
    console.error('Помилка при виході:', error);
  }
};

// Дані користувача (приклад)
const userData = ref({
  name: 'Іван',
  surname: 'Петренко',
  email: 'ivan@example.com',
  phone: '+380 123 456 789',
});
const isEditing = ref(false);

// Дані для вкладок (приклад)
const orders = ref([
  {id: 1234, date: '15.03.2025', status: 'Доставлено', total: 1500},
  {id: 1233, date: '10.03.2025', status: 'В обробці', total: 800},
]);
const reviews = ref([
  {id: 1, product: 'Корм для котів 1кг', date: '10.03.2025', rating: 4, comment: 'Дуже хороший корм!'},
  {id: 2, product: 'Іграшка для собак', date: '05.03.2025', rating: 5, comment: 'Собака в захваті!'},
]);
const bonuses = ref({
  points: 150,
});
const promoCodes = ref([
  {id: 1, code: 'SAVE10', discount: 10, expires: '31.12.2025'},
  {id: 2, code: 'PET20', discount: 20, expires: '15.06.2025'},
]);
const passwordData = ref({
  currentPassword: '',
  newPassword: '',
});
const settingsData = ref({
  emailNotifications: true,
});

// Функції для взаємодії
const saveProfile = async () => {
  console.log('Збережено:', userData.value);
  isEditing.value = false;
};

const changePassword = async () => {
  console.log('Змінено пароль:', passwordData.value);
  passwordData.value = {currentPassword: '', newPassword: ''};
};

const saveSettings = async () => {
  console.log('Збережено налаштування:', settingsData.value);
};

const deleteReview = (id) => {
  reviews.value = reviews.value.filter(review => review.id !== id);
};
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}
</style>