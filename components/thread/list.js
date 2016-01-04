import React from 'react';
import Avatar from '../avatar';
import Thread from './thread';
import style from './style';
import moment from 'moment';
import _ from 'lodash';

const formatTime = (value) => {
	if (!value) {
		return '';
	}
	return moment(value).format('HH:mm');
};

// TODO reuse rendering of user name from message component

export const Topic = (props) => {
	let className = `topic ${style.topic}`;
	if (props.selected) className += ` ${style.topic_selected}`;

	const msg = props.last_message || props.message || {};
	const user = msg.user;
	const unread = props.unread ? `${props.unread > 10 ? '10+' : props.unread} new` : '';
	const avatarURL = user ? user.avatar_url || user.avatar : null;

	const onClick = (e) => {
		e.preventDefault();
		if (_.isFunction(props.onSelect)) {
			props.onSelect(props.thread);
		}
	};

	return (
		<div className={className} onClick={onClick}>
			{avatarURL ? <Avatar source={avatarURL} size={props.avatarSize} name={user.name}/> : null}
			<div className={`header ${style.header}`}>
				<span>{props.topic}</span>
				{unread ? <span className={`unread ${style.unread}`}>{unread}</span> : null}
			</div>
			<div className={`body ${style.body}`}>{msg.body}</div>
			<div>
				{user && user.name ? <span className={style.user_name}>{user.name}</span> : null}
				<span className={style.time}>{` at ${formatTime(props.updated_at)}`}</span>
			</div>
		</div>
	);
};

function selectProps(props, ...names) {
	return names.map(k => props.hasOwnProperty(k) ? props[k] : undefined).filter(t => t !== undefined);
}

// TODO render only topic in collapsed mode

export const ThreadList = (props) => {
	// TODO use propTypes of Thread component
	const options = selectProps(props,
		'avatarSize',
		'fetchUser',
		'sendMessage',
		'onSelect',
		'onAction'
	);
	const items = props.threads.map(t => {
		return <Thread key={t.id} {...t} {...options}/>;
		// return <Topic key={t.id} thread={t} {...t} onSelect={props.onSelect}/>;
	});
	return (
		<div className={`topic_list ${style.topic_list}`}>
			{items}
		</div>
	);
};

export default ThreadList;
