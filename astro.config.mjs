// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // This is required for the sitemap to generate absolute URLs
  site: 'https://hofmapublishing.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});