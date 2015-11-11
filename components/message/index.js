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
	if (!value) {
		return '';
	}
	if (_.isString(value)) {
		return value;
	}
	if (isToday(value)) {
		return moment(value).fromNow();
	}
	return moment(value).format('HH:mm');
};

const Age = ({time}) => {
	const text = formatTime(time);

	let className = `time ${style.time}`;
	if (isToday(time)) {
		className += ` ${style.today}`;
	}

	const attrs = {
		className: className,
	};

	if (moment.isDate(time)) {
		attrs['data-toggle'] = 'tooltip';
		attrs.title = moment(time).format('ddd MMM D YYYY HH:mm:ss');
	}

	return (
		<span {...attrs}>{text}</span>
	);
};

const Message = (props) => {
	const className = `message ${style.message} ${props.className}`;
	const data = props.data || props;
	const time = getTime(data);
	return (
		<div className={className}>
			{data.avatar ? <Avatar source={data.avatar} size={props.avatarSize} name={data.name}/> : null}
			<div className={style.header}>
				{data.name ? <span className={'name ' + style.name}>{data.name}</span> : null}
				{time ? <Age time={time}/> : null}
			</div>
			<Markdown source={data.body}/>
		</div>
	);
};

Message.propTypes = {
	className: React.PropTypes.string,
	data: React.PropTypes.object,
	avatarSize: React.PropTypes.string,
};

Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: '',
};

export default Message;
export {Message, getTime};
