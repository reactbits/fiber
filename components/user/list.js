import React from 'react';
import Avatar from '../avatar';
import style from './style';

export function UserList(props) {
	const users = props.users || [];
	const online = users.filter(u => !!u.online).length;
	const items = users.map(user => {
		const avatarProps = {
			user,
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
				<span className={style.online_count}>{online}</span>
			</div>
			<div className={style.user_list_body}>
				{items}
			</div>
		</div>
	);
}

export default UserList;
