import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [react()],

  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  clearScreen: false,

  build: {
    target: 'chrome110',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-virtuoso'],
          'protobuf-base': ['./src/core/model/base.ts', './src/core/model/shared.ts'],
        },
      },
    },
  },

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
    proxy: {
      '/dylive': {
        target: 'https://live.douyin.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dylive/, ''),
        configure: proxy => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const ua = req.headers['user-agent'] || '';
            const isMobile = /mobile|android|iphone|ipad/i.test(ua);
            if (isMobile) {
              proxyReq.setHeader(
                'User-Agent',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
              );
            }
            proxyReq.setHeader('Referer', 'https://live.douyin.com/');
          });
          proxy.on('proxyRes', proxyRes => {
            const setCookie = proxyRes.headers['set-cookie'];
            if (setCookie) {
              const newCookie = setCookie.map(cookie =>
                cookie
                  .replace(/; Domain=[^;]+/i, '')
                  .replace(/; SameSite=None/, '')
                  .replace(/; Secure=true/i, '')
              );
              proxyRes.headers['set-cookie'] = newCookie;
            }
          });
        },
      },
      '/socket': {
        target: 'wss://webcast100-ws-web-lq.douyin.com',
        changeOrigin: true,
        secure: true,
        ws: true,
        rewrite: path => path.replace(/^\/socket/, ''),
        configure: proxy => {
          proxy.on('proxyReqWs', (proxyReq, req) => {
            const ua = req.headers['user-agent'] || '';
            const isMobile = /mobile|android|iphone|ipad/i.test(ua);
            if (isMobile) {
              proxyReq.setHeader(
                'User-Agent',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0'
              );
            }
          });
        },
      },
    },
  },
}));
