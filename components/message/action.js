import React from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';
import Counter from './counter';
import { hint } from 'css-effects';

// TODO configurable icons
export const ionIconSet = {
	like: 'ion-ios-heart',
	reply: 'ion-ios-chatbubble',
	star: 'ion-star',
	remove: 'ion-trash-a',
	edit: 'ion-edit',
};

export const faIconSet = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash',
	edit: 'fa fa-pencil',
};

export const tips = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete',
	edit: 'Edit',
};

const actionClassNames = {
	like: style.like_count,
	reply: style.message_count,
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

export function Action(props) {
	const { action } = props;
	const count = props.count || 0;
	const onClick = (e) => {
		e.preventDefault();
		if (_.isFunction(props.onAction)) {
			props.onAction(props.type, action, props.data);
		}
	};

	if (action === 'reply') {
		const attrs = {
			className: actionClassNames[action],
			count,
			onClick,
			title: tips[action],
			element: React.DOM.a,
		};
		return <Counter {...attrs}/>;
	}

	const className = classNames({
		[hint()]: true,
		[action]: true,
		[style.action]: true,
		'pull-right': props.right,
	});
	const iconSet = getIconSet(props.iconSet);

	return (
		<a className={className} onClick={onClick} data-hint={tips[action]}>
			<i className={iconSet[action]}/>
			{count > 0 ? <span className="count">{count}</span> : null}
		</a>
	);
}

export default Action;

export function renderActions(actions, type, data, options) {
	return Object.keys(actions)
		.filter(key => {
			if (!_.isFunction(options.canExecute)) return true;
			return options.canExecute(type, key, data);
		})
		.map(key => {
			const props = {
				data,
				type,
				action: key,
				onAction: options.onAction,
				iconSet: options.iconSet,
				...actions[key],
			};
			return <Action key={`${data.id}/${key}`} {...props}/>;
		});
}
