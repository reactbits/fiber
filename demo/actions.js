import store from './store';
import { actions, nextDate } from './state';
import { randomUser, randomJoke } from './api';
import _ from 'lodash';

function randomIndex(arr) {
	return Math.floor(Math.random() * arr.length);
}

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO support multiple sources
let nextId = 1;

function makeMessage() {
	return randomJoke().then(response => {
		const data = response.value;
		const { users } = store.getState();
		const i = randomIndex(users);
		const user = nextId === 1 ? users[0] : users[i];
		const msg = {
			id: nextId++,
			body: data.joke,
			user_id: user.id,
			time: nextDate(nextId - 1),
			likes: rnd(0, 10),
		};
		if ((nextId & 1) === 0) {
			msg.user = user;
		}
		return msg;
	});
}

export function fetchMessageUser(msg) {
	const { users } = store.getState();
	const user = _.find(users, u => u.id === msg.user_id);
	return new Promise(resolve =>
		setTimeout(() => resolve(user), 100)
	);
}

const maxMessages = 10;

function pushMessage(msg) {
	store.dispatch(actions.addMessage(msg));
	if (nextId < maxMessages) {
		setTimeout(fetchQuote, 1000);
	}
}

function fetchQuote() {
	makeMessage().then(msg => {
		const n = rnd(0, 3);
		if (n > 0) {
			// TODO async loading of replies
			return Promise.all(_.range(n).map(makeMessage)).then((replies) => {
				pushMessage({ ...msg, replies });
			});
		}
		pushMessage(msg);
		return msg;
	});
}

// load random users from uifaces.com
const maxUsers = 10;

function fetchUser() {
	randomUser().then(response => {
		const data = response.results[0];
		const name = `${data.name.first} ${data.name.last}`;
		const { users } = store.getState();
		const user = {
			id: users.length + 1,
			name,
			avatar_url: `https://robohash.org/${name}`,
			// avatar_url: user.picture.large,
		};
		store.dispatch(actions.addUser(user));
		if (users.length + 1 >= maxUsers) {
			fetchQuote();
		}
	});
}

for (let i = 0; i < maxUsers; i++) {
	fetchUser();
}

export function canExecute(type, action, msg) {
	const { currentUser } = store.getState();
	if (!currentUser) return false;
	switch (action) {
	case 'delete':
	case 'remove':
	case 'edit':
		return msg.user_id === currentUser.id;
	default:
		return true;
	}
}

export function onAction(type, action, data) {
	if (type === 'message') {
		switch (action) {
		case 'delete':
		case 'remove':
			store.dispatch(actions.removeMessage(data.id));
			return;
		default:
			break;
		}
	}
	swal(`action ${action} on ${type} ${data.id}`);
}

export function selectThread(thread) {
	swal(`selected ${thread.topic}`);
}

export function sendMessage(m) {
	const state = store.getState();
	const msg = {
		...m,
		id: nextId++,
		user: state.currentUser,
		user_id: state.currentUser.id,
	};
	store.dispatch(actions.addMessage(msg));
}

export function updateMessage(msg) {
	store.dispatch(actions.updateMessage(msg));
}

export function createThread({ subject, body }) {
	const { threads, currentUser } = store.getState();
	store.dispatch(actions.addThread({
		id: threads.length + 1,
		subject,
		messages: [
			{
				id: 1,
				body,
				user_id: currentUser.id,
				user: currentUser,
				replies: [],
			},
		],
	}));
}
