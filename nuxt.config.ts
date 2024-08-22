// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /*    routeRules: {
      // Homepage pre-rendered at build time
      '/': { prerender: true },
      // Product page generated on-demand, revalidates in background
      '/products/!**': { swr: true },
      // Blog post generated on-demand once until next deploy
      '/blog/!**': { isr: true },
      // Admin dashboard renders only on client-side
      '/signup': { ssr: false },
  },*/
  app: {
      pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
      public: {
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', "@nuxt/image"],

  i18n: {
      locales: [
          { code: 'uk', iso: 'uk-UA', file: 'uk.json' }
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
      componentIslands: {
          selectiveClient: true
      }
  },

  future: {
      compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-14'
})