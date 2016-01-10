import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ImageLoader from 'react-imageloader';
import Spinner from 'halogen/ClipLoader';
import style from './style';
import _ from 'lodash';
import is from 'is_js';
import gravatarURL from './gravatar';
import '../tooltip';
import { toPromise } from '../util';

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

function preloader() {
	const css = {
		marginLeft: 16,
		marginTop: 16,
	};
	return (
		<div style={css}>
			<Spinner color="#4DAF7C" size="32px"/>
		</div>
  );
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
		const attrs = { ...sourceProps };
		if (props.className) {
			attrs.className += ' ' + props.className;
		}
		if (props.title) {
			attrs['data-toggle'] = 'tooltip';
			attrs.title = props.title;
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
		this.state = { source: props.source };
		this.setSource = this.setSource.bind(this);
	}

	setSource(value) {
		return this.setState({ source: value });
	}

	render() {
		// TODO shadow
		const props = this.props;
		const className = classNames(
			props.className,
			'avatar',
			style.avatar,
			style.circled,
			{
				// TODO animation
				[style.hover_rotate]: props.animated,
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
			className: style.online,
			title: props.name,
		});

		const promise = toPromise(src);
		if (promise) {
			promise.then(this.setSource);
			return (
				<div className={className} style={avatarStyle}>
					{preloader}
				</div>
			);
		}

		if (!_.isString(src)) {
			throw new Error('invalid source property');
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
