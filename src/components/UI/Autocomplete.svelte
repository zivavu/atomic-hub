<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { get } from 'svelte/store';
	import { clickOutside } from '../../utils/clickOutside';
	import { allTags } from '../ArticlesFeed/stores';
	import TextInput from './TextInput.svelte';

	// Props
	export let className: string = '';
	let searchTerm: string = '';
	const dispatch = createEventDispatcher();

	function handleSelect(tag: string) {
		dispatch('select', tag);
		searchTerm = ''; // Clear search term on selection
	}

	function clearSearch() {
		searchTerm = ''; // Clear search term on click outside
	}
</script>

<div class={`relative ${className}`} use:clickOutside={clearSearch}>
	<TextInput bind:value={searchTerm} placeholder="Wyszukaj po tagach..." />
	{#if searchTerm}
		<ul
			class="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
		>
			{#each Array.from(get(allTags)) as tag}
				{#if tag.includes(searchTerm.toLowerCase())}
					<li>
						<button
							class="block w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
							on:click={() => handleSelect(tag)}
						>
							{tag}
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>
