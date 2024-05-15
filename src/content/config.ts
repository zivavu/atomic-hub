import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		author: z.string().optional(),
		stepsToTake: z.array(z.string()).optional(),
	}),
});

export const collections = { articles };
