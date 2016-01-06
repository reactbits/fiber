import React, { Component, PropTypes } from 'react';
import { Message, MessageInput, getTime } from '../message';
import Avatar from '../avatar';
import Day from './day';
import style from './style';
import moment from 'moment';
import _ from 'lodash';

const Topic = props => {
	return (
		<a className={'topic ' + style.topic} onClick={props.onClick}>
			<span>{props.text}</span>
		</a>
	);
};

const getDay = time => {
	const m = moment(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
};

const getMsgDay = msg => getDay(getTime(msg));

const msgCount = m => 1 + (Array.isArray(m.replies) ? m.replies.map(msgCount) : 0);

// TODO allow to use custom MessageInput component
export class Thread extends Component {
	static propTypes = {
		className: PropTypes.string,
		topic: PropTypes.string,
		messages: PropTypes.array,
		avatarSize: Avatar.propTypes.size,
		fetchUser: PropTypes.func,
	}

	static defaultProps = {
		className: '',
		topic: '',
		messages: [],
	}

	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	render() {
		const props = this.props;
		const className = `thread ${style.thread} ${props.className}`;
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
					let msgcount = 0;
					if (collaseMessages) {
						msgcount = msgCount(msg);
						for (i++; i < messages.length; i++) {
							if (day !== getMsgDay(messages[i])) {
								i--;
								break;
							}
							msgcount += msgCount(messages[i]);
						}
					}
					items.push(makeDay(time, msgcount));
				}
				if (collaseMessages) continue;
				items.push(renderMessage(msg));
			}

			const sendMessage = (body) => {
				if (_.isFunction(props.sendMessage)) {
					props.sendMessage({ threadId: props.id, body });
				}
			};

			items.push(<MessageInput key={`message-input-${props.id}`} submit={sendMessage}/>);
		}

		const collapse = () => {
			this.setState({ collapsed: !this.state.collapsed });
		};

		return (
			<div className={className}>
				{subject ? <Topic text={subject} onClick={collapse}/> : null}
				{items}
			</div>
		);
	}
}

export default Thread;
