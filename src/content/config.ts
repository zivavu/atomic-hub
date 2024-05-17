import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			tags: z.array(z.string()),
			cover: image().optional(),
			coverAlt: z.string().optional(),
		}),
});

export const collections = {
	articles: articlesCollection,
};
