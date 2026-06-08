import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://literaturafest1.netlify.app',
  integrations: [db(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});