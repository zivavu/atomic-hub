<script lang="ts">
	import { onMount } from 'svelte';

	// Typy dla gwiazd
	interface Star {
		x: number;
		y: number;
		size: number;
		color: string;
		baseBrightness: number;
		twinkleSpeed: number;
		twinkleOffset: number;
		fastTwinkleSpeed: number;
		brightness?: number;
		scale?: number;
	}

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let stars: Star[] = [];
	let scrollY = 0;
	let lastRender = 0;
	let resizeTimeout: number | null = null;

	function createStar(): void {
		const size = Math.random() * 1.5 + 0.2;
		const color =
			Math.random() < 0.1
				? '#f9f5d7'
				: Math.random() < 0.5
					? '#ffffff'
					: '#a8dadc';
		const star: Star = {
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			size: size,
			color: color,
			baseBrightness: Math.random() * 0.2 + 0.5,
			twinkleSpeed: Math.random() * 0.001 + 0.001,
			twinkleOffset: Math.random() * Math.PI * 2,
			fastTwinkleSpeed: Math.random() * 0.001,
		};
		stars.push(star);
	}

	function generateStars(count: number): void {
		stars = [];
		for (let i = 0; i < count; i++) {
			createStar();
		}
	}

	function handleScroll(): void {
		scrollY = window.scrollY;
	}

	function updateStarBrightness(): void {
		const time = Date.now();
		for (const star of stars) {
			const slowTwinkle =
				Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.2 + 0.5;
			const fastTwinkle = Math.sin(time * star.fastTwinkleSpeed) * 0.1 + 0.9;
			star.brightness = star.baseBrightness * slowTwinkle * fastTwinkle;
			star.scale = 1 + star.brightness * 1.5;
		}
	}

	function drawStars(): void {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (const star of stars) {
			ctx.beginPath();
			ctx.arc(
				star.x,
				star.y,
				star.size * (star.scale ?? 1),
				0,
				2 * Math.PI,
				false
			);
			ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + (star.brightness ?? 0)})`;
			ctx.fill();
		}
	}

	function animate(timestamp: number): void {
		if (timestamp - lastRender > 16) {
			updateStarBrightness();
			drawStars();
			lastRender = timestamp;
		}
		requestAnimationFrame(animate);
	}

	function handleResize(): void {
		if (resizeTimeout) {
			clearTimeout(resizeTimeout);
		}
		resizeTimeout = window.setTimeout(() => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			generateStars(150);
		}, 200);
	}

	onMount(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx = canvas.getContext('2d')!;
		generateStars(150);

		requestAnimationFrame(animate);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<canvas bind:this={canvas} class="canvas invisible lg:dark:visible"></canvas>

<style>
	.canvas {
		position: fixed;
		visibility: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: -1;
		background-color: transparent;
	}
</style>
