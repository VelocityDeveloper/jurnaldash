import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}'
      }
  }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,  
  sanctum: {
    mode: 'cookie',
    baseUrl: process.env.API_URL,
    redirectIfAuthenticated: true,
    redirectIfUnauthenticated: true,
    redirect: {
      keepRequestedRoute: true,
      onAuthOnly: '/login',
      onGuestOnly: '/',
      onLogout: '/login'
    },
    globalMiddleware: {
      enabled: true,
      allow404WithoutAuth: true,
    },
    logLevel: 1,
  },
  primevue: {
    autoImport: true,
    options: {
        theme: {
            preset: MyPreset,
            options: {
              darkModeSelector: '.dark',
            }
        }
    }
  }, 
  tailwindcss: {   
    config: { 
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: 'theme(colors.blue.500)',
              50: 'theme(colors.blue.50)',
              100: 'theme(colors.blue.100)',
              200: 'theme(colors.blue.200)',
              300: 'theme(colors.blue.300)',
              400: 'theme(colors.blue.400)',
              500: 'theme(colors.blue.500)',
              600: 'theme(colors.blue.600)',
              700: 'theme(colors.blue.700)',
              800: 'theme(colors.blue.800)',
              900: 'theme(colors.blue.900)',
            },
            secondary: {
              DEFAULT: 'theme(colors.amber.500)',
              50: 'theme(colors.amber.50)',
              100: 'theme(colors.amber.100)',
              200: 'theme(colors.amber.200)',
              300: 'theme(colors.amber.300)',
              400: 'theme(colors.amber.400)',
              500: 'theme(colors.amber.500)',
              600: 'theme(colors.amber.600)',
              700: 'theme(colors.amber.700)',
              800: 'theme(colors.amber.800)',
              900: 'theme(colors.amber.900)',
            },
          },
        },
      },
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-auth-sanctum',
    '@primevue/nuxt-module',
    '@nuxt/icon',
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@nuxt/fonts'
  ]
})