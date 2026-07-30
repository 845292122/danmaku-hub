import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: './electron/main/index.ts',
        output: {
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      rollupOptions: {
        input: './electron/preload/index.ts',
        output: {
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
      },
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    root: '.',
    build: {
      rollupOptions: {
        input: './index.html'
      },
      target: 'chrome110',
      chunkSizeWarningLimit: 600,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    server: {
      port: 1420,
      strictPort: true,
    }
  }
})
