export function clickOutside(node: HTMLElement, callback: () => void) {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as HTMLElement) &&
			!event.defaultPrevented
		) {
			callback();
		}
	};

	document.addEventListener('click', handleClick, true);

	// Cleanup
	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		},
	};
}
