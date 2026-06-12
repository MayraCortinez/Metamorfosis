import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://literaturafest.netlify.app',
  integrations: [db(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static',
  adapter: netlify(),
});