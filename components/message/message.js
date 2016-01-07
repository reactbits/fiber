import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Avatar from '../avatar';
import Markdown from '../markdown';
import UserName from './username';
import Age from './age';
import MessageInput from './messageinput';
import { renderActions } from './action';
import style from './style';
import { promiseOnce, getOrFetch } from '../util';
import _ from 'lodash';

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

export const getTime = (msg) => {
	const t = msg.updated_at || msg.created_at || msg.time;
	if (!t) return null;
	const d = new Date(t);
	return isNaN(d.getTime()) ? null : d;
};

export class Message extends Component {
	static propTypes = {
		className: PropTypes.string,
		data: PropTypes.object,
		avatarSize: Avatar.propTypes.size,
		isReply: PropTypes.bool,
	};

	static defaultProps = {
		className: '',
		data: {},
		avatarSize: '',
		isReply: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			showReplyInput: false,
		};
	}

	render() {
		const props = this.props;
		const className = classNames('message', style.message, props.className, {
			[style.reply]: !!props.isReply,
		});
		const data = props.data || props;
		const user = data.user;
		const time = getTime(data);
		const likes = data.likes || 0;
		const fetchUser = promiseOnce(data.fetchUser || props.fetchUser, data);
		const avatar = getOrFetch(fetchUser, user, 'avatar', 'avatar_url');
		const userName = getOrFetch(fetchUser, user, 'name', 'login');

		// TODO support data.replies as promise
		const replies = data.replies || [];

		// TODO render admin badge
		// TODO customize action glyph icons (fa, etc)
		// TODO spam icon
		// TODO render replies on reply count click or message click

		const replyElements = replies.map(d => {
			const replyProps = {
				data: d,
				isReply: true,
				avatarSize: props.avatarSize,
				onAction: props.onAction,
			};
			return <Message key={d.id} {...replyProps}/>;
		});

		const showReply = () => {
			this.setState({ showReplyInput: true });
		};

		// TODO allow to hide unused actions
		const actions = {
			reply: { count: replies.length, onAction: showReply },
			like: { count: likes },
			remove: { right: true },
			star: { right: true },
		};

		const actionProps = {
			onAction: props.onAction,
			iconSet: props.iconSet,
		};

		let replyInput = null;

		if (this.state.showReplyInput) {
			const hideReplyInput = () => {
				this.setState({ showReplyInput: false });
			};
			const sendReply = (text) => {
				if (_.isFunction(props.sendMessage)) {
					props.sendMessage({ thread_id: data.thread_id, inReplyTo: data.id, body: text });
				}
			};
			replyInput = <MessageInput submit={sendReply} cancel={hideReplyInput} focused/>;
		}

		return (
			<div className={className} data-id={data.id}>
				{avatar ? <Avatar source={avatar} size={props.avatarSize} name={userName}/> : null}
				<div className={classNames('meta', style.meta)}>
					{userName ? <UserName name={userName}/> : null}
					{time ? <Age time={time}/> : null}
					<span className={classNames('actions', style.actions)}>
						{renderActions(actions, data, actionProps)}
					</span>
				</div>
				<div className={classNames('message-body', style.message_body)}>
					<Markdown source={data.body}/>
				</div>
				{replyInput}
				{replyElements}
			</div>
		);
	}
}

export default Message;
