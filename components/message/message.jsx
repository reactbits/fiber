import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Markdown from 'react-markdown2';
import Avatar, { avatarSize } from '../avatar';
import UserName from './username';
import Age from './age';
import MessageInput from './messageinput';
import { renderActions } from './action';
import style from './style.scss';
import { promiseOnce, getOrFetch } from '../util';

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
		avatarSize: Avatar.propTypes.size,
		isReply: PropTypes.bool,
		theme: PropTypes.string,
	};

	static defaultProps = {
		className: '',
		data: {},
		avatarSize: '',
		isReply: false,
		theme: 'plain',
	};

	constructor(props) {
		super(props);
		this.state = {
			showReplyInput: false,
			showEdit: false,
			collapsed: false,
		};
	}

	renderReplyInput() {
		if (!this.state.showReplyInput) return null;
		const props = this.props;
		const data = props.data || props;
		const hideReplyInput = () => {
			this.setState({ showReplyInput: false });
		};
		const sendReply = (text) => {
			hideReplyInput();
			if (_.isFunction(props.sendMessage)) {
				props.sendMessage({ thread_id: data.thread_id, in_reply_to: data.id, body: text });
			}
		};
		return <MessageInput submit={sendReply} cancel={hideReplyInput} focused />;
	}

	renderEditor() {
		if (!this.state.showEdit) return null;
		const props = this.props;
		const data = props.data || props;
		const hideEdit = () => {
			this.setState({ showEdit: false });
		};
		const updateMessage = (text) => {
			hideEdit();
			if (_.isFunction(props.updateMessage)) {
				props.updateMessage({ thread_id: data.thread_id, id: data.id, body: text });
			}
		};
		return <MessageInput submit={updateMessage} cancel={hideEdit} focused value={data.body} />;
	}

	renderActions() {
		const props = this.props;
		const data = props.data || props;
		const replies = data.replies || [];

		const showReply = () => {
			this.setState({ showReplyInput: true, showEdit: false });
		};

		const showEdit = () => {
			this.setState({ showEdit: true, showReplyInput: false });
		};

		const actions = {
			reply: { count: replies.length, onAction: showReply },
			like: { count: data.likes || 0 },
			edit: { onAction: showEdit },
			remove: { },
			star: { },
		};

		const actionProps = {
			onAction: props.onAction,
			canExecute: props.canExecute,
			iconSet: props.iconSet,
		};

		return renderActions(actions, 'message', data, actionProps);
	}

	renderReplies(fetchUser) {
		const props = this.props;
		const data = props.data || props;
		// TODO support data.replies as promise
		const replies = data.replies || [];

		return (this.state.collapsed ? [] : replies).map(d => {
			const replyProps = {
				data: d,
				isReply: true,
				avatarSize: props.avatarSize,
				fetchUser,
				onAction: props.onAction,
				canExecute: props.canExecute,
				sendMessage: props.sendMessage,
				updateMessage: props.updateMessage,
				theme: props.theme,
			};
			return <Message key={d.id} {...replyProps} />;
		});
	}

	render() {
		const className = classNames(style.message, this.props.className, style[this.props.theme], {
			[style.reply]: !!this.props.isReply,
		});
		const data = this.props.data || this.props;
		const user = data.user;
		const time = getTime(data);
		const fetchUser = promiseOnce(data.fetchUser || this.props.fetchUser, data);
		const userName = getOrFetch(fetchUser, user, 'name', 'login');

		const outerAvatar = this.props.theme === 'github';
		const avatarProps = {
			user: user || fetchUser,
			size: this.props.avatarSize,
			circled: this.props.theme === 'plain',
			style: {
				float: 'left',
			},
		};

		const bodyProps = {
			className: classNames(style.message_body),
			style: {
				minHeight: avatarSize(this.props.avatarSize) - 16,
			},
		};

		// TODO render badges
		// TODO spam icon
		const toggleIconProps = {
			className: this.state.collapsed ? 'fa fa-plus-square-o' : 'fa fa-minus-square-o',
			onClick: () => this.setState({ collapsed: !this.state.collapsed }),
		};

		return (
			<div className={classNames(style.message_wrapper, style[this.props.theme])}>
				{outerAvatar ? <Avatar {...avatarProps} /> : null}
				<div className={className} data-id={data.id}>
					{outerAvatar ? null : <Avatar {...avatarProps} />}
					<div className={classNames(style.meta)}>
						<i {...toggleIconProps} />
						{userName ? <UserName name={userName} /> : null}
						{time ? <Age time={time} /> : null}
						<span className={classNames(style.actions)}>
							{this.renderActions()}
						</span>
					</div>
					{
						this.state.collapsed ? null :
							<div {...bodyProps}>
								<Markdown source={data.body} />
							</div>
					}
					{this.renderReplyInput()}
					{this.renderEditor()}
					{this.renderReplies(fetchUser)}
				</div>
			</div>
		);
	}
}

export default Message;
