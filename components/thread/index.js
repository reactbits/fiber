import React, {PropTypes} from 'react';
import Message, {getTime} from '../message';
import Avatar from '../avatar';
import style from './style';
import moment from 'moment';

const Text = (props) => {
	return (
		<div className={props.className}>
			{props.text || ''}
		</div>
	);
};

const Topic = (props) => {
	return <Text className={'topic ' + style.topic} text={props.text}/>;
};

const getDay = (msg) => {
	const time = getTime(msg);
	return moment.isDate(time) ? moment(time).dayOfYear() : -1;
};

const formatDay = (time) => {
	const now = moment();
	const day = now.dayOfYear();
	const m = moment(time);
	// this year
	if (m.year() === now.year()) {
		if (m.dayOfYear() === day) {
			// TODO localization
			return 'Today';
		}
		if (m.dayOfYear() === day - 1) {
			// TODO localization
			return 'Yesterday';
		}
		// this week
		if (m.week() === now.week()) {
			return m.format('dddd');
		}
		return m.format('MMMM D, dddd');
	}
	return m.format('MMMM D YYYY, dddd');
};

const Day = (props) => {
	const time = getTime(props.message || {});
	const text = formatDay(time);
	return <Text className={'day ' + style.day} text={text}/>;
};

const Thread = (props) => {
	const className = `thread ${style.thread} ${props.className}`;
	const messages = props.messages || [];
	const items = [];
	for (let i = 0; i < messages.length; i++) {
		const msg = messages[i];
		const time = getTime(msg);
		if (moment.isDate(time) && (i === 0 || getDay(msg) !== getDay(messages[i - 1]))) {
			items.push(<Day key={+time} message={msg}/>);
		}
		items.push(<Message key={msg.id} data={msg} avatarSize={props.avatarSize} fetchUser={props.fetchUser}/>);
	}
	return (
		<div className={className}>
			{props.topic ? <Topic text={props.topic}/> : null}
			{items}
		</div>
	);
};

Thread.propTypes = {
	className: PropTypes.string,
	topic: PropTypes.string,
	messages: PropTypes.array,
	avatarSize: Avatar.propTypes.size,
	fetchUser: PropTypes.func,
};

Thread.defaultProps = {
	className: '',
	topic: '',
	messages: [],
};

export default Thread;
export {Thread};
