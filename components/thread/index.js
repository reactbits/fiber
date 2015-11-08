import React from 'react';
import Message from '../message';
import style from './style';

const Topic = (props) => {
	const className = style.topic;
	return (
		<div className={className}>
		{props.text || ''}
		</div>
	);
};

const Thread = (props) => {
	// TODO group messages by day
	const className = style.thread;
	const messages = (props.messages || []).map(msg => {
		return <Message key={msg.id} data={msg}/>;
	});
	return (
		<div className={className}>
			<Topic text={props.topic}/>
			{messages}
		</div>
	);
};

export default Thread;
export {Thread};
