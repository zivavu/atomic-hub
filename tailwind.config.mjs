/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'bg-light': '#ffffff',
				'bg-dark': '#1a202c',
				'text-light': '#000000',
				'text-dark': '#ffffff',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['dark', 'hover', 'focus'],
			borderColor: ['dark', 'hover', 'focus'],
			textColor: ['dark', 'hover', 'focus'],
		},
	},
	plugins: [],
	darkMode: 'class',
	plugins: [require('@tailwindcss/typography')],
};
