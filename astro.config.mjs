import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://t3headless.com',
  devToolbar: {
    enabled: false,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/crm': {
          target: 'https://manager.woodwolfdigital.com/api/method',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/crm/, ''),
        },
      },
    },
  },
});
