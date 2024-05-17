<script lang="ts">
	import { onMount } from 'svelte';
	import SelectedTags from './SelectedTags.svelte';
	import ArticleList from './SingleArticle.svelte';
	import TagInput from './TagInput.svelte';
	import { allTags, articles, type Article } from './stores';

	export let articlesData: Article[] = [];

	onMount(() => {
		const tagsSet = new Set<string>();
		articlesData.forEach((article) => {
			article.data?.tags?.forEach((tag: string) =>
				tagsSet.add(tag.toLowerCase())
			);
		});
		allTags.set(tagsSet);
		articles.set(articlesData);
	});
</script>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<TagInput />
	<SelectedTags />
	<ArticleList />
</main>
