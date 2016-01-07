import React from 'react';
import classNames from 'classnames';
import style from './style';

export const Counter = (props) => {
	const className = props.className || classNames('message-count', style.message_count);
	const elem = props.element || React.DOM.span;
	let attrs = { className, onClick: props.onClick };
	if (props.title) {
		attrs = {
			...attrs,
			'data-toggle': 'tooltip',
			title: props.title,
		};
	}
	return elem(attrs, props.count);
};

export default Counter;
