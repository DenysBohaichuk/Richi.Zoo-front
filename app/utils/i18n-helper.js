// utils/i18n-helper.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({})

export const translate = (key, value) => i18n.global.t(key, value);
