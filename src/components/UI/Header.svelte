<script>
	import Icon from '@iconify/svelte';
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

	const ICON_SIZE = 32;
</script>

<header class="bg-slate-700 text-white sticky top-0 dark:bg-gray-800 py-6 z-50">
	<div class="container mx-auto px-6 flex justify-between items-center">
		<a href="/" class=" text-2xl font-bold"> Atomowy Hub </a>
		<nav>
			<ul class="flex space-x-4 items-center">
				<li>
					<a
						href="https://github.com/zivavu/atomic-hub"
						target="_blank"
						rel="noopener noreferrer"
						title="Odwiedź nasze repozytorium na GitHub"
					>
						<Icon icon="mdi:github" width={ICON_SIZE} height={ICON_SIZE} />
					</a>
				</li>
				<li class="relative group">
					<button disabled title="Dołącz do naszej społeczności na Discordzie">
						<Icon
							icon="ic:baseline-discord"
							width={ICON_SIZE}
							height={ICON_SIZE}
						/>
					</button>
				</li>
				<li>
					<button
						bind:this={themeToggle}
						on:click={toggleTheme}
						title="Przełącz motyw"
					>
						<Icon
							icon={theme === 'light'
								? 'mdi:weather-night'
								: 'mdi:weather-sunny'}
							width={ICON_SIZE}
							height={ICON_SIZE}
						/>
					</button>
				</li>
			</ul>
		</nav>
	</div>
</header>
