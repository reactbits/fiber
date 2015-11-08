import React from 'react';
import style from './style';
import _ from 'lodash';

// TODO get gravatars if source is email

const avatarSize = {
	small: 24,
	sm: 24,
	s: 24,
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

const Avatar = (props) => {
	// TODO circled
	// TODO shadow
	const className = style.avatar;
	const url = props.source;
	const avatarStyle = props.style || {};
	const size = mapSize(props.size);
	return (
		<img className={className} style={avatarStyle} src={url} width={size} height={size}/>
	);
};

export default Avatar;
export {Avatar};
