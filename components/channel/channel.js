import React from 'react';
import classNames from 'classnames';
import style from './style';
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
	return (
		<NavItem className={className} onClick={select} selected={props.selected}>
			{props.data.name}
		</NavItem>
	);
};

export default Channel;
