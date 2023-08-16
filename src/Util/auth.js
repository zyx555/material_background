export function clearToken() {
	return	(
		localStorage.removeItem('token'),
		localStorage.removeItem('type'),
		localStorage.removeItem('username'),
		localStorage.removeItem('oldPassword')
		);
	}