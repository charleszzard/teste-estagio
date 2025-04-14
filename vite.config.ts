import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://github.com/charleszzard/teste-estagio', // Repositorio
  plugins: [react()],
});
