import React, { Component } from 'react';
import Avatar from '../avatar';
import style from './style.scss';
import _ from 'lodash';

export class ContributorList extends Component {
	constructor(props) {
		super(props);
		const { users } = props;
		this.state = {
			users: _.isFunction(users) ? users() : users,
		};
	}

	componentDidMount() {
		const { users } = this.props;
		if (_.isFunction(users)) {
			setTimeout(() => {
				this.setState({ users: users() });
			}, 0);
			this.unsubscribe = users(list => {
				this.setState({ users: list });
			});
		}
	}

	componentWillUnmount() {
		if (_.isFunction(this.unsubscribe)) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}

	render() {
		const { users } = this.props;
		if (_.isFunction(users)) {
			setTimeout(() => {
				this.setState({ users: users() });
			}, 0);
		}
		const items = this.state.users.map(user => {
			const avatarProps = {
				hover: 'grow',
				user,
				shape: 'round_rect',
				online: false,
				size: 24,
				style: {
					display: 'inline-block',
					margin: '0px',
				},
			};
			return <Avatar key={user.id} {...avatarProps} />;
		});
		return (
			<div className={style.contributor_list}>
				{items}
			</div>
		);
	}
}

export default ContributorList;
