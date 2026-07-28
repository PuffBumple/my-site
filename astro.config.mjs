// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [mdx()],
  adapter: cloudflare({}),
  vite: {
    ssr: {
      // Prevents Vite from externalizing built-in Node modules during dev execution
      noExternal: ['shiki'],
    },
  },
    env: {
    schema: {
      BLOG_PASSWORD: {
        type: 'string',
        context: 'server', // Ensures it stays hidden on the backend
        access: 'secret',
      }
    }
    }
});
