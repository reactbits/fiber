import React from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';

// TODO configurable icons
export const ionIconSet = {
	like: 'ion-ios-heart',
	reply: 'ion-ios-chatbubble',
	star: 'ion-star',
	remove: 'ion-trash-a',
};

export const faIconSet = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash',
};

export const tips = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete',
};

function getIconSet(name) {
	switch (name) {
	case 'fa':
	case 'awesome':
		return faIconSet;
	case 'ion':
	case 'ionic':
	default:
		return ionIconSet;
	}
}

export const Action = (props) => {
	const className = classNames({
		action: true,
		[props.type]: true,
		[style.action]: true,
		'pull-right': props.right,
	});
	const iconSet = getIconSet(props.iconSet);
	const count = props.count || 0;

	const onClick = (e) => {
		e.preventDefault();
		if (_.isFunction(props.onAction)) {
			props.onAction(props.type, props.msgid);
		}
	};

	return (
		<a className={className} onClick={onClick} data-toggle="tooltip" title={tips[props.type]}>
			<i className={iconSet[props.type]}/>
			{count > 0 ? <span className="count">{count}</span> : null}
		</a>
	);
};

export default Action;

export function renderActions(actions, msg, options) {
	return Object.keys(actions).map(key => {
		const props = {
			msgid: msg.id,
			type: key,
			...actions[key],
			onAction: options.onAction,
			iconSet: options.iconSet,
		};
		props.type = key;
		return <Action key={`${msg.id}/${key}`} {...props}/>;
	});
}
