import React from 'react';
import Avatar from '../avatar';
import style from './style';
import moment from 'moment';

const formatTime = (value) => {
	if (!value) {
		return '';
	}
	return moment(value).format('HH:mm');
};

// TODO reuse rendering of user name from message component

const Topic = (props) => {
	let className = `topic ${style.topic}`;
	if (props.selected) className += ` ${style.topic_selected}`;

	const user = props.user;
	const unread = props.unread ? `${props.unread > 10 ? '10+' : props.unread} new` : '';

	return (
		<div className={className}>
			{user && user.avatar ? <Avatar source={user.avatar} size={props.avatarSize} name={user.name}/> : null}
			<div className={`header ${style.header}`}>
				<span>{props.title}</span>
				{unread ? <span className={`unread ${style.unread}`}>{unread}</span> : null}
			</div>
			<div className={`body ${style.body}`}>{props.message}</div>
			<div>
				<span className={style.user_name}>{user.name}</span>
				<span className={style.time}>{` at ${formatTime(props.updated_at)}`}</span>
			</div>
		</div>
	);
};

const TopicList = (props) => {
	const items = props.items.map(t => {
		return <Topic {...t}/>;
	});
	return (
		<div className={`topic_list ${style.topic_list}`}>
			{items}
		</div>
	);
};

export default TopicList;
export {Topic, TopicList};
