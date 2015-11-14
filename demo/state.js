const initialState = {
	currentUser: null,
	threads: []
	selectedThread: {
		user: {
			avatar: '',
			name: '',
		},
		title: '',
		messages: [],
	},
};

const ADD_TOPIC = 'ADD_TOPIC';
const REMOVE_TOPIC = 'REMOVE_TOPIC';
const SELECT_TOPIC = 'SELECT_TOPIC';
const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export function selectTopic(id) {
	return {
		type: SELECT_TOPIC,
		id: id,
	};
}

export function addMessage(msg) {
	return {
		type: ADD_MESSAGE,
		message: msg,
	};
}

export function removeMessage(msg) {
	return {
		type: REMOVE_MESSAGE,
		message: msg,
	};
}

export function reducer(state = initialState, action) {
	return state;
}
