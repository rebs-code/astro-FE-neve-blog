import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { defineConfig } from 'astro/config';
import { sanityIntegration } from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from "@astrojs/tailwind";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // path to your scss variables
          //additionalData: `@use "./src/styles/style.scss";`,
        }
      }
    }
  },
  image: {
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  integrations: [sanityIntegration({
    projectId: 'cpcy2oar',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    apiVersion: '2024-05-21',
    useCdn: false
  }), react(), tailwind()],

  site: 'https://www.my-site.dev', //add here final site domain to unlock more astro features and RSS feed
});