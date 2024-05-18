import type { InferEntrySchema } from 'astro:content';

export type Article = {
	slug: string;
	id: string;
	body: string;
	data: InferEntrySchema<'articles'>;
	collection: string;
};
