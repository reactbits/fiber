import React, {Component, PropTypes} from 'react';
import ImageLoader from 'react-imageloader';
import Spinner from 'halogen/ClipLoader';
import style from './style';
import _ from 'lodash';
import is from './is';
import gravatarURL from './gravatar';
import '../tooltip';
import {toPromise} from '../util';

const avatarSize = {
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

const mapSize = (value) => {
	return (_.isString(value) ? avatarSize[value.toLowerCase()] : value) || defaultSize;
};

const avatarURL = (url) => {
	if (is.email(url)) {
		return gravatarURL(url);
	}
	return url;
};

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

const RandomAvatar = (props) => {
	// TODO render random avatar
	const size = props.size;
	return (
		<img src={gravatarURL(props.src)} width={size} height={size}/>
	);
};

const makeWrapper = (title) => {
	return (props, content) => {
		const attrs = {...props};
		if (title) {
			attrs['data-toggle'] = 'tooltip';
			attrs.title = title;
		}
		return <div {...attrs}>{content}</div>;
	};
};

class Avatar extends Component {
	static propTypes = {
		className: PropTypes.string,
		size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		style: PropTypes.object,
	}

	static defaultProps = {
		className: '',
		size: 'normal',
		style: {},
	}

	constructor(props) {
		super(props);
		this.state = {source: props.source};
		this.setSource = this.setSource.bind(this);
	}

	setSource(value) {
		return this.setState({source: value});
	}

	render() {
		// TODO circled
		// TODO shadow
		// TODO animated (rotate on hover)
		const className = `avatar ${style.hover_rotate} ${style.avatar} ${this.props.className}`;
		const src = avatarURL(this.state.source);
		const size = mapSize(this.props.size);
		const avatarStyle = {
			...this.props.style,
			marginLeft: -(size + 8),
		};

		const imgProps = {
			width: size,
			height: size,
		};

		const wrapper = makeWrapper(this.props.name);

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

		return (
			<ImageLoader className={className} style={avatarStyle}
				src={src} wrapper={wrapper} preloader={preloader} imgProps={imgProps}>
				<RandomAvatar src={src} size={size}/>
			</ImageLoader>
		);
	}
}

export default Avatar;
export {Avatar};
