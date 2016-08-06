import _ from 'lodash';
import React, { Component } from 'react';
import style from './style.scss';

export default class Input extends Component {
	componentDidMount() {
		if (this.props.focused) {
			$(this.refs.input).focus();
		}
	}

	render() {
		const props = this.props;
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
		return <textarea ref="input" {...attrs} />;
	}
}
