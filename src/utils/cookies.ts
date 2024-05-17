export function getCookie(request: Request, name: string) {
	const value = `; ${request.headers.get('cookie')}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
	return null;
}

export function setCookie(name: string, value: string, days = 7): string {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	return `${name}=${value || ''}${expires}; path=/`;
}
