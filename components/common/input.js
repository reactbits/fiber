import React from 'react';
import style from './style';
import _ from 'lodash';

export function Input(props) {
	const onKeyUp = (e) => {
		if (e.which === 27) {
			const input = $(e.target);
			input.blur();
			if (_.isFunction(props.cancel)) {
				props.cancel();
				return;
			}
			return;
		}
		if (e.ctrlKey && e.which === 13 && _.isFunction(props.submit)) {
			props.submit();
		}
	};
	const onMouseDown = (e) => {
		const input = $(e.target);
		input.focus();
	};
	const attrs = {
		className: props.className || style.input,
		type: 'text',
		onKeyUp,
		onMouseDown,
		...props,
	};
	return <textarea {...attrs}/>;
}

export default Input;