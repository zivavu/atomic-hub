<script lang="ts">
	import AutoComplete from '../UI/Autocomplete.svelte';
	import { selectedTags } from './stores';

	function searchArticles(searchQuery: string) {
		const searchQueryLower = searchQuery.toLowerCase();
		selectedTags.update((tags) => {
			if (tags.includes(searchQueryLower)) return tags;
			return [...tags, searchQueryLower];
		});
	}

	function addTag(tag: string) {
		if (!tag) return;
		selectedTags.update((tags) => {
			if (tags.includes(tag.toLowerCase())) return tags;
			return [...tags, tag.toLowerCase()];
		});
	}

	function clearTags() {
		selectedTags.set([]);
	}
</script>

<div
	class="relative mb-4 flex items-center justify-center w-full max-w-lg mx-auto"
>
	<AutoComplete
		on:select={(event) => addTag(event.detail)}
		on:search={(event) => searchArticles(event.detail)}
		className="w-full"
	/>
	<button
		on:click={clearTags}
		class="bg-red-500 text-white p-2 ml-2 rounded-lg flex items-center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	</button>
</div>
