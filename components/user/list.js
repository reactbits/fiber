import React from 'react';
import Avatar from '../avatar';
import style from './style';

export function UserList(props) {
	const users = props.users || [];
	const online = users.filter(u => !!u.online).length;
	const items = users.map(user => {
		const avatarProps = {
			user,
			className: style.user_item,
			hover: 'grow',
			shape: 'round_rect',
			size: 32,
			style: {
				margin: 0,
			},
		};
		return <Avatar key={user.id} {...avatarProps}/>;
	});
	return (
		<div className={style.user_list}>
			<div className={style.user_list_header}>
				<i className="ion-ios-people"/>
				<span>Online</span>
				<em className={style.online_count}>{online}</em>
			</div>
			<div className={style.user_list_body}>
				{items}
			</div>
		</div>
	);
}

export default UserList;
