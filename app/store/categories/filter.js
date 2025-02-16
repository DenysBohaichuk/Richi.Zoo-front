import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter', {
    state: () => ({
        filterOpenStates: {}, // зберігає стан відкриття для кожної секції
    }),
    actions: {
        toggleFilterSection(name) {
            if (this.filterOpenStates[name] === undefined) {
                this.filterOpenStates = { ...this.filterOpenStates, [name]: true };
            } else {
                this.filterOpenStates[name] = !this.filterOpenStates[name];
            }
        },
        initializeFilterOpen(name, value) {
            this.filterOpenStates = { ...this.filterOpenStates, [name]: value };
        }
    }
});