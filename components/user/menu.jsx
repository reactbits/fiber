import React, { Component } from 'react';
import Avatar from '../avatar';
import { ContextMenu } from '../common';
import style from './menu.scss';

// TODO use UserName component to render user name

export default class UserMenu extends Component {
	renderContent(user) {
		const avatarProps = {
			className: style.user_avatar,
			user,
			size: 32,
			circled: true,
			style: {
				margin: 0,
			},
		};
		const menuProps = {
			button: {
				content: (
					<span>
						&nbsp;
						<i className="fa fa-caret-down" />
					</span>
				),
			},
		};
		return (
			<span>
				<Avatar {...avatarProps} />
				&nbsp;
				{user.name || user.login}
				<ContextMenu {...menuProps}>
					{this.props.children}
				</ContextMenu>
			</span>
		);
	}

	render() {
		const props = this.props;
		const user = props.user;
		return (
			<div className={style.user_menu}>
				{user ? this.renderContent(user) : null}
			</div>
		);
	}
}
