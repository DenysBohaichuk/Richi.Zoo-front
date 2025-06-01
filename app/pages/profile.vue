<template>
  <BaseUserIsAuthUser redirect-path="/login">
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 class="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">
          {{ $t('profile.title') }}
        </h1>

        <!-- Вкладки -->
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

        <!-- Для мобілки: select -->
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
          <!-- --- Вкладка: Особисті дані --- -->
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
                    @click="cancelEdit"
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 w-full sm:w-auto"
                >
                  {{ $t('profile.personal.cancel') }}
                </button>
              </template>
            </div>
          </div>

          <!-- --- Вкладка: Мої замовлення --- -->
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

          <!-- --- Вкладка: Налаштування --- -->
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

          <!-- --- Вкладка: Мої відгуки --- -->
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

          <!-- --- Вкладка: Бонуси/знижки --- -->
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
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { useAuthStore } from '~/store/user/auth.js';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { apiMethods } from '~/composables/api/methods/apiMethods.js';

definePageMeta({
  middleware: 'is-auth',
  layout: 'default',
});

const authStore = useAuthStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

// Вкладки
const tabs = ref([]);
const activeTab = ref('personal');
let isOnProfilePage = ref(true);

// Дані користувача та стани
const userData = ref({
  id: null,
  name: '',
  surname: '',
  email: '',
  phone: '',
  bio: '',
  avatar: ''  // URL або шлях
});
const isEditing = ref(false);

// Замовлення, відгуки, бонуси (поки що можна ставити порожні масиви — можна потім окремо запитувати)
const orders = ref([]);
const reviews = ref([]);
const bonuses = ref({ points: 0 });
const promoCodes = ref([]);

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  newPasswordConfirmation: ''
});
const settingsData = ref({
  emailNotifications: true
});

// Отримати дані профілю
const fetchProfile = async () => {
  try {
    const response = await apiMethods.getProfile();
    // Приклад відповіді: { data: { user: { id, name, surname, email, phone, bio, avatar, … } } }
    const user = response.data;

    // Заповнюємо реактивну змінну
    userData.value = {
      id: user.id,
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      avatar: user.avatar ? `/storage/${user.avatar}` : ''  // якщо в базі зберігається шлях у storage/app/public
    };

    // Якщо у відповіді були також orders / reviews / bonuses / promoCodes:
    if (response.data.orders) {
      orders.value = response.data.orders;
    }
    if (response.data.reviews) {
      reviews.value = response.data.reviews;
    }
    if (response.data.bonuses) {
      bonuses.value = response.data.bonuses;
    }
    if (response.data.promoCodes) {
      promoCodes.value = response.data.promoCodes;
    }
  } catch (error) {
    console.error('Не вдалося отримати профіль:', error);
    // Якщо отримали 401 або 403, можна примусово логаутитись:
    if (error.statusCode === 401 || error.statusCode === 403) {
      authStore.logout();
      router.push('/login');
    }
  }
};

onMounted(async () => {
  // Якщо потребуєте додаткової перевірки authStore.isLoggedIn, розкоментуйте:
  // if (!authStore.isLoggedIn) { router.push('/login'); return; }
  await fetchProfile();

  tabs.value = [
    {id: 'personal', name: t('profile.tabs.personal')},
    {id: 'orders', name: t('profile.tabs.orders')},
    {id: 'settings', name: t('profile.tabs.settings')},
    {id: 'reviews', name: t('profile.tabs.reviews')},
    {id: 'bonuses', name: t('profile.tabs.bonuses')}
  ];

  const tabFromUrl = route.query.tab;
  if (tabFromUrl && tabs.value.some((tab) => tab.id === tabFromUrl)) {
    activeTab.value = tabFromUrl;
  }
});

watch(activeTab, (newTab) => {
  if (isOnProfilePage.value) {
    router.push({query: {tab: newTab}});
  }
});

watch(() => route.query.tab, (newTab) => {
  if (newTab && tabs.value.some((tab) => tab.id === newTab)) {
    activeTab.value = newTab;
  } else {
    activeTab.value = 'personal';
  }
});

watch(
    () => route.path,
    (newPath) => {
      isOnProfilePage.value = newPath === '/profile';
      if (!isOnProfilePage.value) {
        router.replace({query: {}});
      }
    }
);

onBeforeUnmount(() => {
  isOnProfilePage.value = false;
  router.replace({query: {}});
});

// Оновлення вкладок через select
const updateTabFromSelect = () => {
  router.push({query: {tab: activeTab.value}});
};

// Функція виходу
const logout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (e) {
    console.error('Помилка при логауті:', e);
  }
};

// Збереження профілю
const saveProfile = async () => {
  try {
    // Формуємо обʼєкт для оновлення
    const payload = {
      name: userData.value.name,
      surname: userData.value.surname,
      email: userData.value.email,
      phone: userData.value.phone,
      bio: userData.value.bio
    };
    await apiMethods.updateProfile(payload);

    // Після успіху — забираємо режим редагування
    isEditing.value = false;
    // Перезапитуємо профіль, щоб отримати найновіші дані (наприклад, змінився avatar)
    await fetchProfile();
  } catch (error) {
    console.error('Помилка при збереженні профілю:', error);
  }
};

// Скасувати редагування — просто відкат до початкових значень
const cancelEdit = () => {
  isEditing.value = false;
  fetchProfile();
};

// Зміна пароля
const changePassword = async () => {
  try {
    await apiMethods.changePassword({
      current_password: passwordData.value.currentPassword,
      new_password: passwordData.value.newPassword,
      new_password_confirmation: passwordData.value.newPasswordConfirmation
    });
    // Очистимо поля після успіху
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    };
    alert(t('profile.settings.passwordChanged')); // або показати toast
  } catch (error) {
    console.error('Помилка при зміні пароля:', error);
    // Можна показати повідомлення користувачу
    if (error.statusCode === 422) {
      alert(error.data.error.message || 'Помилка валідації');
    }
  }
};

// Збереження налаштувань (наприклад, прапорець emailNotifications)
// Якщо бекенд не підтримує окремий ендпоінт, можна реалізувати аналогічно через updateProfile
const saveSettings = async () => {
  try {
    // Якщо ви мають окремий ендпоінт для налаштувань, викликайте його
    // але якщо налаштування зберігаються в тій же моделі User, можна передавати частину полів через updateProfile:
    await apiMethods.updateProfile({
      email_notifications: settingsData.value.emailNotifications
    });
    alert(t('profile.settings.saved'));
  } catch (error) {
    console.error('Не вдалося зберегти налаштування:', error);
  }
};

// Видалити відгук
const deleteReview = (id) => {
  reviews.value = reviews.value.filter((review) => review.id !== id);
};
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}
</style>
