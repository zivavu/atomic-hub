import type { InferEntrySchema } from 'astro:content';
import { derived, writable } from 'svelte/store';

interface Tag extends Set<string> {}

export type Article = {
	slug: string;
	id: string;
	body: string;
	data: InferEntrySchema<'articles'>;
	collection: string;
};

export const articles = writable<Article[]>([]);
export let selectedTags = writable<string[]>([]);
export let allTags = writable<Tag>(new Set());

export const filteredArticles = derived(
	[selectedTags, articles],
	([$selectedTags, $articles]) => {
		if ($selectedTags.length === 0) {
			return $articles;
		}
		return $articles.filter((article) =>
			$selectedTags.every((tag) =>
				article?.data.tags?.some((articleTag) =>
					articleTag.toLowerCase().includes(tag)
				)
			)
		);
	}
);
