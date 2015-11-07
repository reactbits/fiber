import React from 'react';
import Message from '../message';
import style from './style';

const Topic = (props) => {
	return (
		<div className="topic">
		{props.text || ''}
		</div>
	);
};

const Thread = (props) => {
	// TODO group messages by day
	const messages = (props.messages || []).map(msg => {
		return <Message data={msg}/>;
	});
	return (
		<div className="thread">
			<Topic text={props.topic}/>
			{messages}
		</div>
	);
};

export default Thread;
export {Thread};
