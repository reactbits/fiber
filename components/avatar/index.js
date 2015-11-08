import React from 'react';
import ImageLoader from 'react-imageloader';
import Spinner from 'halogen/ClipLoader';
import style from './style';
import _ from 'lodash';
import is from './is';
import gravatarURL from './gravatar';

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

const Avatar = (props) => {
	// TODO circled
	// TODO shadow
	const className = style.avatar;
	const src = avatarURL(props.source);
	const size = mapSize(props.size);
	const avatarStyle = Object.assign({}, props.style || {}, {
		marginLeft: -(size + 8),
	});

	const imgProps = {
		width: size,
		height: size,
	};

	return (
		<ImageLoader className={`avatar ${className}`} style={avatarStyle}
			src={src} wrapper={React.DOM.div} preloader={preloader} imgProps={imgProps}>
			<RandomAvatar src={src} size={size}/>
  	</ImageLoader>
	);
};

export default Avatar;
export {Avatar};
