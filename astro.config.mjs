// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [mdx()],
  adapter: cloudflare({
        platformProxy: {
      enabled: true,
      // Forces Astro to use the Node-compatible runtime configuration locally
      experimentalJsonConfig: true, 
    },
  }),
  vite: {
    ssr: {
      // Prevents Vite from externalizing built-in Node modules during dev execution
      noExternal: ['shiki'],
    },
  },
});
