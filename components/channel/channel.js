import React from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';

export const Channel = (props) => {
	const className = classNames(
		'channel',
		style.channel,
		{ [style.selected_channel]: props.selected }
	);
	const select = () => {
		if (_.isFunction(props.select)) {
			props.select(props.data);
		}
	};
	return (
		<div className={className}>
			<a onClick={select}>{props.data.name}</a>
		</div>
	);
};

export default Channel;
