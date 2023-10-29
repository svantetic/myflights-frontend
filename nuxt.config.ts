export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3001,
  },
  imports: {
    dirs: ['types', 'utils'],
  },
  modules: ['@nuxt/ui', '@vueuse/nuxt']
});
