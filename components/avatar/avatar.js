import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ImageLoader from 'react-imageloader';
import { Spinner } from '../common';
import style from './style';
import _ from 'lodash';
import is from 'is_js';
import gravatarURL from './gravatar';
import '../tooltip';
import { toPromise } from '../util';
import hover from '../hover';

const avatarSizes = {
	small: 24,
	sm: 24,
	s: 24,
	normal: 32,
	medium: 32,
	m: 32,
	large: 40,
	l: 40,
	xl: 64,
};

const defaultSize = 32;

export function avatarSize(value) {
	return (_.isString(value) ? avatarSizes[value.toLowerCase()] : value) || defaultSize;
}

function avatarURL(url) {
	if (is.email(url)) {
		return gravatarURL(url);
	}
	return url;
}

function makePreloader(size) {
	return () => {
		const css = {
			width: size,
			height: size,
		};
		return (
			<div className={style.preloader} style={css}>
				<Spinner size={size}/>
			</div>
		);
	};
}

function RandomAvatar(props) {
	// TODO render random avatar
	const size = props.size;
	return (
		<img src={gravatarURL(props.src)} width={size} height={size}/>
	);
}

function makeWrapper(props) {
	return (sourceProps, content) => {
		const attrs = { ...sourceProps, ...props };
		if (props.title) {
			attrs['data-toggle'] = 'tooltip';
		}
		return (
			<div {...attrs}>{content}</div>
		);
	};
}

export class Avatar extends Component {
	static propTypes = {
		className: PropTypes.string,
		size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		style: PropTypes.object,
	};

	static defaultProps = {
		className: '',
		size: 'normal',
		style: {},
	};

	constructor(props) {
		super(props);

		let source = props.source;
		if (!source) {
			const user = props.user;
			if (user && _.isObject(user)) {
				source = user.avatar_url || user.avatar;
			}
		}

		this.state = { source, user: props.user };
	}

	online() {
		if (this.props.hasOwnProperty('online')) {
			return this.props.online;
		}
		const user = this.state.user;
		return user && _.isObject(user) && user.online;
	}

	title() {
		const value = this.props.title || this.props.name;
		if (value) return value;
		const user = this.state.user;
		if (user && _.isObject(user)) {
			return user.name || user.login;
		}
		return '';
	}

	render() {
		// TODO shadow
		const props = this.props;
		const shape = style[props.shape || 'circle'];
		const hoverEffect = hover(props.hover);
		const className = classNames(
			props.className,
			'avatar',
			style.avatar,
			{
				[shape]: true,
				[style.online]: this.online(),
				[style.circled]: props.circled,
				[hoverEffect]: true,
			}
		);

		const src = avatarURL(this.state.source);
		const size = avatarSize(this.props.size);
		const avatarStyle = {
			width: size + 8,
			height: size + 8,
			marginLeft: -(size + 8),
			...this.props.style,
		};

		const imgProps = {
			width: size,
			height: size,
		};

		const wrapper = makeWrapper({
			title: this.title(),
		});

		const preloader = makePreloader(size);

		function empty() {
			return (
				<div className={className} style={avatarStyle}>
					{preloader()}
				</div>
			);
		}

		const sourcePromise = toPromise(src);
		if (sourcePromise) {
			sourcePromise.then(value => {
				this.setState({ source: value });
			});
			return empty();
		}

		if (!src && this.props.user) {
			const userPromise = toPromise(this.props.user);
			if (userPromise) {
				userPromise.then(user => {
					this.setState({
						user,
						source: user.avatar_url || user.avatar,
					});
				});
				return empty();
			}
		}

		if (!_.isString(src)) {
			// TODO render error
			return empty();
		}

		const loaderProps = {
			src,
			wrapper,
			preloader,
			imgProps,
		};

		return (
			<ImageLoader className={className} style={avatarStyle} {...loaderProps}>
				<RandomAvatar src={src} size={size}/>
			</ImageLoader>
		);
	}
}

export default Avatar;
