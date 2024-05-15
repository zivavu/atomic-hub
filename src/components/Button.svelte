<script lang="ts">
	type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
	type ButtonType = 'button' | 'submit' | 'reset';
	type Size = 'small' | 'medium' | 'large' | 'huge';

	export let href: string = '';
	export let target: string = '_self';
	export let disabled: boolean = false;
	export let className: string = '';
	export let variant: Variant = 'primary';
	export let type: ButtonType = 'button';
	export let size: Size = 'medium';
	export let onClick: () => void = () => {};

	const baseClasses =
		'inline-block text-white shadow-md hover:shadow-lg rounded focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out';

	const sizeClasses: Record<Size, string> = {
		small: 'px-4 py-2 text-xs',
		medium: 'px-6 py-2.5 text-sm',
		large: 'px-8 py-3 text-base',
		huge: 'px-10 py-4 text-lg',
	};

	const variantClasses: Record<Variant, string> = {
		primary:
			'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800',
		secondary:
			'bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800',
		success:
			'bg-green-600 hover:bg-green-700 focus:bg-green-700 active:bg-green-800',
		danger: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800',
		warning:
			'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700',
	};

	const allClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className || ''}`;
</script>

{#if href}
	<a
		{href}
		{target}
		class={allClasses}
		class:opacity-50={disabled}
		class:cursor-not-allowed={disabled}
		aria-disabled={disabled}
		on:click={onClick}
	>
		<p>
			<slot />
		</p>
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={allClasses}
		class:opacity-50={disabled}
		class:cursor-not-allowed={disabled}
		on:click={onClick}
	>
		<p>
			<slot />
		</p>
	</button>
{/if}
