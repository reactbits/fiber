import React from 'react';
import _ from 'lodash';

// TODO configurable icons
export const actionIcon = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash',
};

export const actionTip = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete',
};

export const Action = (props) => {
	let className = `action ${props.type}`;
	if (props.right) className += ' pull-right';

	const count = props.count || 0;

	const onClick = (e) => {
		e.preventDefault();
		if (_.isFunction(props.onAction)) {
			props.onAction(props.type, props.msgid);
		}
	};

	return (
		<a className={className} onClick={onClick} data-toggle="tooltip" title={actionTip[props.type]}>
			<i className={actionIcon[props.type]}/>
			{count > 0 ? <span className="count">{count}</span> : null}
		</a>
	);
};

export default Action;

export function renderActions(actions, msg, handler) {
	return Object.keys(actions).map(key => {
		const props = {
			msgid: msg.id,
			type: key,
			...actions[key],
			onAction: handler,
		};
		props.type = key;
		return <Action key={`${msg.id}/${key}`} {...props}/>;
	});
}
