import makeReducer from 'make-reducer';

const initialState = {
	currentUser: null,
	threads: [],
	messages: [],
};

export const reducer = makeReducer(initialState);

export const addMessage = reducer.on('ADD_MESSAGE', (state, msg) => {
	return {
		...state,
		messages: [...state.messages, msg],
	};
});

export const removeMessage = reducer.on('REMOVE_MESSAGE', (state, msg) => {
	return {
		...state,
		messages: state.messages.filter(m => m.id !== msg.id),
	};
});
