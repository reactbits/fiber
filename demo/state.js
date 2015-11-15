const initialState = {
	currentUser: null,
	threads: [],
	messages: [],
};

// TODO extract into separate module

class Builder {
	mutators: {},

	add(type, update) {
		this.mutators[type] = update;
		return (data) => {
			return {
				type: type,
				data: data,
			};
		};
	},

	build() {
		const mutators = this.mutators;
		return (state, action) => {
			const fn = mutators[action.type];
			if (!fn) {
				return fn;
			}
			return fn(state, action.data);
		};
	},
}

const builder = new Builder();

export const addMessage = builder.add('ADD_MESSAGE', (state, msg) => {
	return {
		...state,
		[...state.messages, msg],
	};
});

export const removeMessage = builder.add('REMOVE_MESSAGE', (state, msg) => {
	return {
		...state,
		state.messages.filter(m => m.id != msg.id),
	};
});

export const reducer = builder.build();
