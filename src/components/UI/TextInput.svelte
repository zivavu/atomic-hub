<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let onEnter: (() => void) | null = null;

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && onEnter) {
			onEnter();
		}
	}
</script>

<input
	type="text"
	bind:value
	{placeholder}
	class="p-2 border rounded w-full max-w-xl transform transition duration-100 focus:border-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-gray-600"
	on:keypress={handleKeyPress}
/>
