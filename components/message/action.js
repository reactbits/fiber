import React from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';
import Counter from './counter';

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

export const Action = (props) => {
	const count = props.count || 0;
	const onClick = (e) => {
		e.preventDefault();
		if (_.isFunction(props.onAction)) {
			props.onAction(props.type, props.msgid);
		}
	};

	if (props.type === 'reply') {
		const attrs = {
			className: actionClassNames[props.type],
			count,
			onClick,
			title: tips[props.type],
			element: React.DOM.a,
		};
		return <Counter {...attrs}/>;
	}

	const className = classNames({
		action: true,
		[props.type]: true,
		[style.action]: true,
		'pull-right': props.right,
	});
	const iconSet = getIconSet(props.iconSet);

	return (
		<a className={className} onClick={onClick} data-toggle="tooltip" title={tips[props.type]}>
			<i className={iconSet[props.type]}/>
			{count > 0 ? <span className="count">{count}</span> : null}
		</a>
	);
};

export default Action;

export function renderActions(actions, msg, options) {
	return Object.keys(actions)
		.filter(key => {
			if (!_.isFunction(options.canExecute)) return true;
			return options.canExecute(key, msg);
		})
		.map(key => {
			const props = {
				msgid: msg.id,
				type: key,
				onAction: options.onAction,
				iconSet: options.iconSet,
				...actions[key],
			};
			props.type = key;
			return <Action key={`${msg.id}/${key}`} {...props}/>;
		});
}
