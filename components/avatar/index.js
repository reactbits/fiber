import React from 'react';
import style from './style';

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

const Avatar = (props) => {
	// TODO render avatar
	const url = props.source;
	const style = props.style || {};
	return (
		<img
			className="avatar"
			style={style}
			src={url}
		/>
	);
};

export default Avatar;
export {Avatar};
