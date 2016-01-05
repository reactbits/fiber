import React from 'react';
import style from './style';

// TODO render user avatar
// TODO configure submit shortcut, alt-enter is default

export const MessageInput = (props) => {
	const className = `message-input ${style.message_input}`;
	const onKeyUp = (e) => {
		const input = $(e.target);
		if (e.altKey && e.which === 13) {
			const text = input.val();
			if (!text) return;
			input.val('');
			props.submit(text);
		}
	};
	const inputStyle = {
		width: '100%',
	};
	return (
		<div>
			<textarea className={className} style={inputStyle} placeholder="Reply..." onKeyUp={onKeyUp}>
			</textarea>
		</div>
	);
};

export default MessageInput;
