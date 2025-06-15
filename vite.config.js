import { defineConfig } from 'vite'

export default defineConfig({
  base: '/zpi-zp41_appWEB3_HryshchenkoYuliia_KPI_2025/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        timer: '1-timer.html',
        snackbar: '2-snackbar.html',
        imageSearch: '3-image-search.html',
      },
    },
  },
});
