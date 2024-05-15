import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), tailwind(), mdx()],
  output: 'server',
  adapter: cloudflare()
});