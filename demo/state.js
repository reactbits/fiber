import makeReducer from 'make-reducer';
import moment from 'moment';
import _ from 'lodash';

const timeline = [
	// previous year
	moment().subtract(1, 'years').subtract(45, 'minutes').toDate(),
	moment().subtract(1, 'years').subtract(53, 'minutes').toDate(),
	// previous week
	moment().subtract(7, 'days').subtract(45, 'minutes').toDate(),
	moment().subtract(7, 'days').subtract(53, 'minutes').toDate(),
	// yesterday
	moment().subtract(2, 'days').subtract(45, 'minutes').toDate(),
	moment().subtract(2, 'days').subtract(53, 'minutes').toDate(),
	// today
	moment().subtract(1, 'days').subtract(32, 'minutes').toDate(),
	moment().subtract(1, 'days').subtract(42, 'minutes').toDate(),
];

export function nextDate(i) {
	if (i < timeline.length) {
		return timeline[i];
	}
	return new Date();
}

export const users = [
	{
		name: 'sergeyt',
		avatar_url: 'stodyshev@gmail.com',
	},
	{
		name: 'sergeyt',
		avatar_url: 'https://robohash.org/sergeyt',
	},
	{
		name: 'noavatar',
		avatar_url: 'noavatar.png',
	},
];

const initialState = {
	threads: [
		{
			id: 1,
			topic: 'Chuck Norris Database',
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
			topic: 'Offtopic',
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

export const reducer = makeReducer(initialState);

function rnd(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setThread(state, msg) {
	if (msg.thread_id) return msg;
	const i = rnd(0, state.threads.length - 1);
	return { ...msg, thread_id: state.threads[i].id };
}

export const addMessage = reducer.on('ADD_MESSAGE', (state, m) => {
	const msg = setThread(state, m);
	const threads = [...state.threads];
	const i = _.findIndex(threads, t => t.id === msg.thread_id);
	const thread = threads[i];
	threads[i] = {
		...thread,
		messages: [...thread.messages, msg],
	};
	return { ...state, threads };
});

export const removeMessage = reducer.on('REMOVE_MESSAGE', (state, msg) => {
	const threads = state.threads.map(t => {
		return {
			...t,
			messages: t.messages.filter(m => m.id !== msg.id),
		};
	});
	return { ...state, threads };
});
