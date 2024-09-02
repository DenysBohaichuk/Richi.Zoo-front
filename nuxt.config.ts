// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },

    runtimeConfig: {
        public: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            appURL: process.env.APP_URL,
            apiURL: process.env.API_URL
        },
    },


    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/i18n',
        "@nuxt/image",
        '@nuxtjs/sitemap',
        '@nuxtjs/robots'
    ],

    sitemap: {
        hostname: process.env.APP_URL,
        gzip: true,
        routes: async () => {
            // Генерація маршрутів для вашого sitemap
            return [
                '/',
                '/about',
                '/products',
            ];
        }
    },
    robots: {
        UserAgent: '*',
        Allow: '/',
        Sitemap: 'https://ваш-сайт.com/sitemap.xml'
    },

    i18n: {
        locales: [
            {code: 'uk', iso: 'uk-UA', file: 'uk.json'}
        ],
        defaultLocale: 'uk',
        lazy: true,
        langDir: 'locales/',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            cookieKey: 'userLang',
            alwaysRedirect: 'true'
        },
    },

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: false,
        exposeLevel: 2,
        config: {},
        injectPosition: 'first',
        viewer: true,
    },

    css: [
        '~/assets/css/main.css',
        '~/assets/css/mountains_background.css',
    ],

    experimental: {
        componentIslands: true
    },

    future: {
        compatibilityVersion: 4,
    },

    compatibilityDate: '2024-08-14'
})