export default defineNuxtConfig({
  runtimeConfig: {
    backendHost: process.env.NUXT_PUBLIC_BACKEND_HOST || 'localhost',
    backendPort: process.env.NUXT_PUBLIC_BACKEND_PORT || '3020'
  },
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  imports: {
    dirs: ['types', 'utils'],
  },
  modules: ['@nuxt/ui', '@vueuse/nuxt']
});
