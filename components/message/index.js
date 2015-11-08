import React from 'react';
import Avatar from '../avatar';
import Markdown from '../markdown';
import moment from 'moment';
import style from './style';

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

const Message = (props) => {
	const className = style.message;
	const data = props.data || props;
	// TODO option to display age or short time
	const time = data.updated_at || data.created_at || data.time;
	const age = time ? moment(time).fromNow() : '';
	return (
		<div className={className}>
			<Avatar source={data.avatar}/>
			<div className={style.header}>
				<span className={style.name}>{data.name}</span>
				<span className={style.time}>{age}</span>
			</div>
			<Markdown source={data.body}/>
		</div>
	);
};

export default Message;
export {Message};
