import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './'  // ✅ 相對路徑，避免找不到資源
})
