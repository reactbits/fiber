import React from 'react';
import style from './style.scss';
import { hint } from 'css-effects';

export default function Counter(props) {
	const className = props.className || style.message_count;
	const attrs = { className, onClick: props.onClick };
	const counter = <span {...attrs}>{props.count}</span>;
	if (props.title) {
		return <span className={hint()} data-hint={props.title}>{counter}</span>;
	}
	return counter;
}
