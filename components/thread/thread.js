import React, { Component, PropTypes } from 'react';
import { Message, getTime } from '../message';
import MessageInput from './messageinput';
import Avatar from '../avatar';
import Day from './day';
import style from './style';
import moment from 'moment';
import _ from 'lodash';

const Topic = (props) => {
	return <a className={'topic ' + style.topic} onClick={props.onClick}>{props.text}</a>;
};

const getDay = (msg) => {
	const time = getTime(msg);
	return moment.isDate(time) ? moment(time).dayOfYear() : -1;
};

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
		const messages = props.messages || [];
		const items = [];

		if (!this.state.collapsed) {
			for (let i = 0; i < messages.length; i++) {
				const msg = messages[i];
				const time = getTime(msg);
				if (moment.isDate(time) && (i === 0 || getDay(msg) !== getDay(messages[i - 1]))) {
					items.push(<Day key={+time} time={time}/>);
				}
				const elem = (
					<Message key={msg.id} data={msg} avatarSize={props.avatarSize} fetchUser={props.fetchUser} onAction={props.onAction}/>
				);
				items.push(elem);
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
				{props.topic ? <Topic text={props.topic} onClick={collapse}/> : null}
				{items}
			</div>
		);
	}
}

export default Thread;
export { Thread };
