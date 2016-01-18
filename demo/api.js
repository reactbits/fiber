export function randomUser() {
	return fetch('https://randomuser.me/api/').then(t => t.json());
}

export function randomFace() {
	return fetch('http://uifaces.com/api/v1/random').then(t => t.json());
}

export function randomJoke() {
	return fetch('http://api.icndb.com/jokes/random').then(t => t.json());
}
