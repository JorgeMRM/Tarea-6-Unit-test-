import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,        // describe/test/expect disponibles sin importar
    environment: 'node',  // para estas pruebas de lógica es suficiente
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx']
  }
})
