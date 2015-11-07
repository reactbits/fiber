import React from 'react';
import Avatar from '../avatar';
import Markdown from '../markdown';
import moment from 'moment';
import style from './style';

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

const Message = (props) => {
	const data = props.data || props;
	return (
		<div className="message">
			<Avatar source={data.avatar}/>
			<div className="header">
				<span className="name">{data.name}</span>
				<span className="time">{data.time}</span>
			</div>
			<Markdown source={data.body}/>
		</div>
	);
};

export default Message;
export {Message};
