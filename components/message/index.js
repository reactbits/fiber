import React from 'react';
import Avatar from '../avatar';
import Markdown from '../markdown';
import moment from 'moment';
import style from './style';
import _ from 'lodash';

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

const getTime = (msg) => {
	return msg.updated_at || msg.created_at || msg.time;
};

const isToday = (value) => {
	if (!moment.isDate(value)) return false;
	const now = moment();
	const m = moment(value);
	return m.year() === now.year() && m.dayOfYear() === now.dayOfYear();
};

const formatTime = (value) => {
	if (!value || _.isString(value)) return '';
	if (isToday(value)) {
		return moment(value).fromNow();
	}
	return moment(value).format('HH:mm');
};

const Message = (props) => {
	const data = props.data || props;
	const time = getTime(data);
	const ts = formatTime(time);
	let timeClass = `time ${style.time}`;
	if (isToday(time)) timeClass += ` ${style.today}`;
	return (
		<div className={'message ' + style.message}>
			{data.avatar ? <Avatar source={data.avatar} size={props.avatarSize}/> : null}
			<div className={style.header}>
				{data.name ? <span className={'name ' + style.name}>{data.name}</span> : null}
				{time ? <span className={timeClass}>{ts}</span> : null}
			</div>
			<Markdown source={data.body}/>
		</div>
	);
};

export default Message;
export {Message, getTime};
