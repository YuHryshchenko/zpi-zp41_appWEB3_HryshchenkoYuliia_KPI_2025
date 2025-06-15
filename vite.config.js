import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
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
