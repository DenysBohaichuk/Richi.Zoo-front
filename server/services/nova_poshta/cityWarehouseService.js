import { ref } from 'vue';

// Змінні для міста і відділень
const cityQuery = ref('');
const cities = ref([]);
const selectedCity = ref(null);
const warehouses = ref([]);
const warehouseInput = ref(''); // новий реф для збереження введеного тексту
const filteredWarehouses = ref([]);
const selectedWarehouse = ref(null);
const showCityDropdown = ref(false);
const showWarehouseDropdown = ref(false);
let debounceTimeout = null;

// Функція debounce
function debounce(fn, delay) {
    return function (...args) {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// Пошук міст
const onCityInput = debounce(async () => {
    if (cityQuery.value.length >= 2) {
        try {
            const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: process.env.NOVA_POSHTА_API_KEY,
                    modelName: 'Address',
                    calledMethod: 'getCities',
                    methodProperties: {
                        FindByString: cityQuery.value,
                    },
                }),
            });

            const data = await response.json();
            if (data.success) {
                cities.value = data.data;
                showCityDropdown.value = true;
            } else {
                console.error('Failed to load cities', data.errors);
                cities.value = [];
                showCityDropdown.value = false;
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            cities.value = [];
            showCityDropdown.value = false;
        }
    } else {
        cities.value = [];
        showCityDropdown.value = false;
        clearWarehouse(); // Очищення відділення при видаленні міста
    }
}, 300);

// Вибір міста і пошук відділень
async function selectCity(city) {
    selectedCity.value = city;
    cityQuery.value = city.Description;
    showCityDropdown.value = false;

    try {
        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apiKey: process.env.NOVA_POSHTА_API_KEY,
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityRef: city.Ref,
                },
            }),
        });

        const data = await response.json();
        if (data.success) {
            warehouses.value = data.data;
            filteredWarehouses.value = warehouses.value;
            selectedWarehouse.value = '';
        } else {
            console.error('Failed to load warehouses', data.errors);
            warehouses.value = [];
            filteredWarehouses.value = [];
        }
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        warehouses.value = [];
        filteredWarehouses.value = [];
    }
}

// Вибір відділення
function selectWarehouse(warehouse) {
    selectedWarehouse.value = warehouse;
    warehouseInput.value = warehouse.Description; // Можете залишити або очистити
    showWarehouseDropdown.value = false;
}


// Очищення вибраного відділення та деактивація поля
function clearWarehouse() {
    selectedWarehouse.value = '';
    warehouses.value = [];
    filteredWarehouses.value = [];
    selectedCity.value = '';
    warehouseInput.value = '';
}

// Відкриття випадаючого списку при фокусі на полі
function onWarehouseFocus() {
    if (filteredWarehouses.value.length) {
        showWarehouseDropdown.value = true;
    }
}

// Закриття випадаючого списку при втраті фокусу
function onWarehouseBlur() {
    setTimeout(() => {
        showWarehouseDropdown.value = false;
    }, 200);
}

// Фільтрування відділень за введенням користувача
const onWarehouseInput = debounce(() => {
        filteredWarehouses.value = warehouses.value.filter((warehouse) =>
            {
               return warehouse.Description.toLowerCase().includes(warehouseInput.value.toLowerCase())
            }
        );
        showWarehouseDropdown.value = true;
}, 300);



export {
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
    onWarehouseBlur,
};
