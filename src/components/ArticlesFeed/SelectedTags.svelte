<script lang="ts">
	import { selectedTagsAtom, setSelectedTags } from './store';

	function removeTag(tag: string) {
		setSelectedTags(selectedTagsAtom.get().filter((t) => t !== tag));
	}
</script>

<div class="mb-4">
	{#if selectedTagsAtom.get().length > 0}
		{#each selectedTagsAtom.get() as tag}
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
