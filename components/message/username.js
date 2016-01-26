import React, { Component } from 'react';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';
import { toPromise } from '../util';

export default class UserName extends Component {
	constructor(props) {
		super(props);
		this.state = { name: props.name };
		this.setName = this.setName.bind(this);
	}

	setName(value) {
		return this.setState({ name: value });
	}

	render() {
		let value = this.state.name;
		if (!value) {
			return <span/>;
		}
		if (!_.isString(value)) {
			const promise = toPromise(value);
			if (promise) {
				promise.then(this.setName);
			}
			// TODO render small spinner
			value = '';
		}
		return <a className={classNames(style.name)}>{value}</a>;
	}
}
