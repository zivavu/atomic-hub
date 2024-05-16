<script lang="ts">
	import { filteredArticles } from './stores';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each $filteredArticles as article}
		<a
			href={`/artykuly/${article.slug}`}
			class="block p-4 rounded-lg border border-gray-300 hover:border-gray-400 transition shadow hover:shadow-md no-underline text-black dark:text-white dark:bg-gray-900 dark:hover:bg-gray-700"
		>
			<h4 class="text-xl font-semibold mb-2">{article.data.title}</h4>
			<p class="text-gray-600 dark:text-gray-400 mb-4">
				{article.data.description}
			</p>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Tagi:
				{#each article?.data?.tags || [] as tag}
					<span
						class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
						>#{tag}</span
					>
				{/each}
			</div>
		</a>
	{/each}
</div>
