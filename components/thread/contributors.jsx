import _ from 'lodash';
import React, { Component } from 'react';
import Avatar from '../avatar';
import style from './style.scss';

export default class ContributorList extends Component {
	constructor(props) {
		super(props);
		const { users } = props;
		this.state = {
			users: _.isFunction(users) ? users() : users,
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.update(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.update(nextProps);
	}

	componentWillUnmount() {
		this.mounted = false;
		if (_.isFunction(this.unsubscribe)) {
			this.unsubscribe();
			this.unsubscribe = null;
		}
	}

	mounted = false;

	update(props) {
		if (_.isFunction(this.unsubscribe)) {
			this.unsubscribe();
			this.unsubscribe = null;
		}

		const { users } = props;

		if (_.isFunction(users)) {
			const result = users(list => {
				if (!this.mounted) return;
				this.setState({ users: list });
			});
			if (_.isFunction(result)) {
				this.unsubscribe = result;
			} else if (_.isArray(result)) {
				this.setState({ users: result });
			}
		} else {
			this.setState({ users });
		}
	}

	render() {
		const items = _.map(this.state.users, user => {
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
