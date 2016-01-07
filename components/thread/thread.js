import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Message, MessageInput, getTime } from '../message';
import Avatar from '../avatar';
import Day from './day';
import style from './style';
import moment from 'moment';
import _ from 'lodash';

const Header = props => {
	const className = classNames('thread-header', style.thread_header);
	return (
		<a className={className} onClick={props.onClick}>
			<span>{props.text}</span>
		</a>
	);
};

const getDay = time => {
	const m = moment(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
};

const getMsgDay = msg => getDay(getTime(msg));

function countDayMessages(messages, start) {
	const countIt = m => {
		let n = 1;
		if (Array.isArray(m.replies)) {
			n += m.replies.reduce((a, b) => a + countIt(b), 0);
		}
		return n;
	};
	const msg = messages[start];
	let result = countIt(msg);
	const day = getMsgDay(msg);
	for (let i = start + 1; i < messages.length; i++) {
		if (day !== getMsgDay(messages[i])) {
			i--;
			break;
		}
		result += countIt(messages[i]);
	}
	return result;
}

// TODO allow to use custom MessageInput component
export class Thread extends Component {
	static propTypes = {
		className: PropTypes.string,
		topic: PropTypes.string,
		messages: PropTypes.array,
		avatarSize: Avatar.propTypes.size,
		fetchUser: PropTypes.func,
	};

	static defaultProps = {
		className: '',
		topic: '',
		messages: [],
	};

	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	render() {
		const props = this.props;
		const className = classNames('thread', style.thread, props.className);
		const subject = props.subject || props.topic;
		const messages = props.messages || [];
		const items = [];

		if (!this.state.collapsed) {
			const collapseDay = (time) => {
				const k = 'collapsedDay' + (+time);
				this.setState({ [k]: !this.state[k] });
			};

			const isCollapsedDay = (time) => {
				const k = 'collapsedDay' + (+time);
				return !!this.state[k];
			};

			const makeDay = (time, msgcount) => {
				const dayProps = {
					time,
					count: msgcount,
					onClick: () => collapseDay(time),
				};
				return <Day key={`day-${props.id}-${+time}`} {...dayProps}/>;
			};

			const renderMessage = (msg) => {
				const msgProps = {
					data: msg,
					avatarSize: props.avatarSize,
					iconSet: props.iconSet,
					fetchUser: props.fetchUser,
					onAction: props.onAction,
					sendMessage: props.sendMessage,
					updateMessage: props.updateMessage,
				};
				return <Message key={msg.id} {...msgProps}/>;
			};

			let collaseMessages = false;
			for (let i = 0; i < messages.length; i++) {
				const msg = messages[i];
				const time = getTime(msg);
				const day = getDay(time);
				if (moment.isDate(time) && (i === 0 || day !== getMsgDay(messages[i - 1]))) {
					collaseMessages = isCollapsedDay(time);
					const msgcount = countDayMessages(messages, i);
					items.push(makeDay(time, msgcount));
				}
				if (collaseMessages) continue;
				items.push(renderMessage(msg));
			}

			const sendMessage = (body) => {
				if (_.isFunction(props.sendMessage)) {
					props.sendMessage({ thread_id: props.id, body });
				}
			};

			items.push(<MessageInput key={`message-input-${props.id}`} submit={sendMessage}/>);
		}

		const collapse = () => {
			this.setState({ collapsed: !this.state.collapsed });
		};

		return (
			<div className={className}>
				{subject ? <Header text={subject} onClick={collapse}/> : null}
				{items}
			</div>
		);
	}
}

export default Thread;
