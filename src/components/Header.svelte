<script>
	import { onMount } from 'svelte';

	let theme = 'light';
	let themeToggle;
	let htmlElement;

	onMount(() => {
		htmlElement = document.documentElement;
		theme = localStorage.getItem('theme') || 'light';
		if (theme === 'dark') {
			htmlElement.classList.add('dark');
		}
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		if (theme === 'dark') {
			htmlElement.classList.add('dark');
		} else {
			htmlElement.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}
</script>

<header class="bg-white dark:bg-gray-800 py-4">
	<div class="container mx-auto px-4 flex justify-between items-center">
		<a href="/" class="text-black dark:text-white text-2xl font-bold">
			Atomowy Hub
		</a>
		<nav>
			<ul class="flex space-x-4">
				<li>
					<button
						bind:this={themeToggle}
						on:click={toggleTheme}
						class="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
						</svg>
					</button>
				</li>
			</ul>
		</nav>
	</div>
</header>
