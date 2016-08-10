import makeReducer from 'make-reducer';
import moment from 'moment';
import _ from 'lodash';
import { updateArray } from 'update-it';

const timeline = [
	// previous year
	moment()
		.subtract(1, 'years')
		.subtract(45, 'minutes')
		.toDate(),
	moment()
		.subtract(1, 'years')
		.subtract(53, 'minutes')
		.toDate(),
	// previous week
	moment()
		.subtract(7, 'days')
		.subtract(45, 'minutes')
		.toDate(),
	moment()
		.subtract(7, 'days')
		.subtract(53, 'minutes')
		.toDate(),
	// yesterday
	moment()
		.subtract(2, 'days')
		.subtract(45, 'minutes')
		.toDate(),
	moment()
		.subtract(2, 'days')
		.subtract(53, 'minutes')
		.toDate(),
	// today
	moment()
		.subtract(1, 'days')
		.subtract(32, 'minutes')
		.toDate(),
	moment()
		.subtract(1, 'days')
		.subtract(42, 'minutes')
		.toDate(),
];

export function nextDate(i) {
	if (i < timeline.length) {
		return timeline[i];
	}
	return new Date();
}

export const users = [
	{
		id: 1,
		name: 'sergeyt',
		avatar_url: 'stodyshev@gmail.com',
		online: true,
	},
	{
		id: 2,
		name: 'sergeyt',
		avatar_url: 'https://robohash.org/sergeyt',
	},
	{
		id: 3,
		name: 'noavatar',
		avatar_url: 'noavatar.png',
	},
];

const channels = [
	{
		id: 1,
		name: 'Issues',
	},
	{
		id: 2,
		name: 'Testing',
	},
	{
		id: 3,
		name: 'Chats',
	},
];

const initialState = {
	currentUser: users[0],
	users,
	channels,
	selectedChannel: channels[0],
	threads: [
		{
			id: 1,
			user: users[0],
			user_id: users[0].id,
			subject: 'Chuck Norris Database',
			last_message: {
				user: users[0],
				body: 'test message',
				updated_at: nextDate(0),
			},
			unread: 4,
			selected: true,
			messages: [],
		},
		{
			id: 2,
			user: users[1],
			user_id: users[1].id,
			subject: 'Offtopic',
			last_message: {
				user: users[0],
				body: 'test message',
				updated_at: nextDate(0),
			},
			unread: 11,
			messages: [],
		},
	],
};

function rnd(min, max) {
	return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function removeById(list, id) {
	return list.filter(t => t.id !== id);
}

function replaceById(list, obj) {
	const i = _.findIndex(list, t => t.id === obj.id);
	if (i >= 0) {
		const result = [...list];
		result[i] = { ...result[i], ...obj };
		return result;
	}
	return list;
}

function setThread(state, msg) {
	if (msg.thread_id) return msg;
	const i = rnd(0, state.threads.length - 1);
	return { ...msg, thread_id: state.threads[i].id };
}

export const actions = {
	addUser(state, user) {
		const list = [...state.users, user];
		return { ...state, users: list };
	},

	selectChannel(state, selectedChannel) {
		return { ...state, selectedChannel };
	},

	addChannel(state, cn) {
		const t = { ...cn, id: state.channels.length + 1 };
		return { ...state, channels: [...state.channels, t] };
	},

	removeChannel(state, id) {
		return { ...state, channels: removeById(state.channels, id) };
	},

	addThread(state, thread) {
		const threads = [...state.threads, thread];
		return { ...state, threads };
	},


	addMessage(state, message) {
		const msg = setThread(state, message);
		const threads = state.threads.map(t => {
			if (t.id !== msg.thread_id) return t;
			if (msg.in_reply_to) {
				const messages = updateArray(t.messages, m => {
					const replies = [...(m.replies || []), msg];
					return { ...m, replies };
				}, m => m.body && m.id === msg.in_reply_to);
				return { ...t, messages };
			}
			return { ...t, messages: [...t.messages, msg] };
		});
		return { ...state, threads };
	},

	removeMessage(state, id) {
		const threads = state.threads.map(t => {
			const messages = removeById(t.messages, id);
			return { ...t, messages };
		});
		return { ...state, threads };
	},

	updateMessage(state, msg) {
		const threads = state.threads.map(t => {
			if (t.id !== msg.thread_id) return t;
			return { ...t, messages: replaceById(t.messages, msg) };
		});
		return { ...state, threads };
	},
};

export const reducer = makeReducer(initialState, actions);
