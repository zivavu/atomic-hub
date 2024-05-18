<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from '../../utils/clickOutside';
	import TextInput from './TextInput.svelte';

	// Props
	export let className: string = '';
	export let options: { value: string; label: string }[] = [];
	let searchTerm: string = '';
	const dispatch = createEventDispatcher();

	function handleSelect(option: { value: string; label: string }) {
		dispatch('select', option);
		searchTerm = ''; // Clear search term on selection
	}

	function clearSearch() {
		searchTerm = ''; // Clear search term on click outside
	}

	$: filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	);
</script>

<div class={`relative ${className}`} use:clickOutside={clearSearch}>
	<TextInput bind:value={searchTerm} placeholder="Search..." />
	{#if searchTerm && filteredOptions.length > 0}
		<ul
			class="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-10 max-h-60 overflow-y-auto"
		>
			{#each filteredOptions as option}
				<li>
					<button
						class="block w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
						on:click={() => handleSelect(option)}
					>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
