import React from 'react';
import classNames from 'classnames';
import style from './style.scss';
import _ from 'lodash';
import { NavItem } from '../common';

// TODO render channel actions
export const Channel = (props) => {
	const className = classNames(style.channel, {
		[style.selected_channel]: props.selected,
	});
	const select = () => {
		if (_.isFunction(props.select)) {
			props.select(props.data);
		}
	};
	const itemProps = {
		className,
		onClick: select,
		selected: props.selected,
		to: props.to,
	};
	return (
		<NavItem {...itemProps}>
			{props.data.name}
		</NavItem>
	);
};

export default Channel;
