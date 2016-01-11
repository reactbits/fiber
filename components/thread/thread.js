import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Message, MessageInput, getTime, Counter } from '../message';
import ContributorList from './contributors';
import Avatar from '../avatar';
import Day from './day';
import style from './style';
import moment from 'moment';
import observable from 'observable';
import _ from 'lodash';
import { toPromise, promiseOnce } from '../util';

const Header = props => {
	const className = classNames('thread-header', style.thread_header);
	return (
		<a className={className} onClick={props.onClick}>
			<span>{props.text}</span>
			<Counter count={props.count || 0}/>
		</a>
	);
};

const getDay = time => {
	const m = moment(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
};

const getMsgDay = msg => getDay(getTime(msg));

function getDayMessages(messages, start) {
	const msg = messages[start];
	const result = [msg];
	const day = getMsgDay(msg);
	for (let i = start + 1; i < messages.length; i++) {
		if (day !== getMsgDay(messages[i])) {
			i--;
			break;
		}
		result.push(messages[i]);
	}
	return result;
}

function countMessages(messages) {
	const countIt = m => {
		let n = 1;
		if (Array.isArray(m.replies)) {
			n += m.replies.reduce((a, b) => a + countIt(b), 0);
		}
		return n;
	};
	return messages.reduce((a, m) => a + countIt(m), 0);
}

function collectContributors(users, messages, fetchUser) {
	function push(user) {
		const arr = users();
		if (_.find(arr, u => u.id === user.id)) return;
		users([...arr, user]);
	}
	messages.forEach(m => {
		if (_.isObject(m.user)) {
			push(m.user);
		} else if (m.fetchUser || fetchUser) {
			const promise = toPromise(promiseOnce(m.fetchUser || fetchUser, m));
			if (promise) {
				promise.then(push);
			}
		}
		if (_.isArray(m.replies)) {
			collectContributors(users, m.replies, fetchUser);
		}
	});
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
			collapsed: true,
		};
	}

	render() {
		const props = this.props;
		const className = classNames('thread', style.thread, props.className);
		const subject = props.subject || props.topic;
		const messages = props.messages || [];
		const items = [];

		if (this.state.collapsed) {
			const users = observable([]);
			collectContributors(users, messages, props.fetchUser);
			items.push(
				<ContributorList key={`cl-${props.id}`} users={users}/>
			);
		} else {
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
					canExecute: props.canExecute,
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
					const dayMessages = getDayMessages(messages, i);
					const msgcount = countMessages(dayMessages);
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
		const headerProps = {
			text: subject,
			onClick: collapse,
			count: countMessages(messages),
		};

		return (
			<div className={className}>
				{subject ? <Header {...headerProps}/> : null}
				{items}
			</div>
		);
	}
}

export default Thread;
