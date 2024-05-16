<script lang="ts">
	import { selectedTags } from './stores';

	function removeTag(tag: string) {
		selectedTags.update((tags) => {
			const index = tags.indexOf(tag);
			if (index > -1) {
				tags.splice(index, 1);
			}
			return [...tags];
		});
	}
</script>

<div class="mb-4">
	{#if $selectedTags.length > 0}
		{#each $selectedTags as tag}
			<span
				class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>
				#{tag}
				<button
					on:click={() => removeTag(tag)}
					class="ml-2 text-red-500 font-bold">x</button
				>
			</span>
		{/each}
	{/if}
</div>
