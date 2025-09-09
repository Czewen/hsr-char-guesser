import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://czewen.github.io/hsr-char-guesser-deploy/',
  plugins: [react()],
})
