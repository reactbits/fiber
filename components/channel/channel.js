import React from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';

// TODO render channel actions
export const Channel = (props) => {
	const className = classNames({
		channel: true,
		[style.channel]: true,
		[style.selected_channel]: props.selected,
	});
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
