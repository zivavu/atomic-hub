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

<div class="px-12 py-8">
	<TagInput />
	<SelectedTags />
	<main>
		<ArticleList />
	</main>
</div>
