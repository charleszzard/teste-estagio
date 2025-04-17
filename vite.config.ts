import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/teste-estagio/',
  plugins: [react()],
  build:{
    outDir: 'dist',
  }
});