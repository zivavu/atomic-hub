import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [svelte(), tailwind(), mdx()],
	output: 'hybrid',
	adapter: vercel(),
});
