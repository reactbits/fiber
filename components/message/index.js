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

const UserName = (props) => {
	const className = `name ${style.name}`;
	return <span className={className}>{props.name}</span>;
};

const Message = (props) => {
	const className = `message ${style.message} ${props.className}`;
	const data = props.data || props;
	const time = getTime(data);
	const likes = data.likes || 0;
	// TODO support data.replies as promise
	const replies = data.replies || [];
	// TODO render admin badge
	// TODO customize action glyph icons
	// TODO spam icon
	// TODO render replies on reply count click or message click
	const replyElements = replies.map(d => {
		return <Message data={d}/>;
	});
	return (
		<div className={className} data-id={data.id}>
			{data.avatar ? <Avatar source={data.avatar} size={props.avatarSize} name={data.name}/> : null}
			<div className={`meta ${style.meta}`}>
				{data.name ? <UserName name={data.name}/> : null}
				{time ? <Age time={time}/> : null}
				<span className='actions'>
					{replies.length > 0 ? <span className='glyphicon glyphicon-comment'>{replies.length}</span> : null}
					<a className='action action-like'>
						<span className='glyphicon glyphicon-heart'></span>
						{likes > 0 ? <strong>{likes}</strong> : null}
					</a>
					<a className='action action-star pull-right'>
						<span className='glyphicon glyphicon-star'></span>
					</a>
				</span>
			</div>
			<div className='body'>
				<Markdown source={data.body}/>
			</div>
			{replyElements}
		</div>
	);
};

Message.propTypes = {
	className: React.PropTypes.string,
	data: React.PropTypes.object,
	avatarSize: Avatar.propTypes.size,
};

Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: '',
};

export default Message;
export {Message, getTime};
