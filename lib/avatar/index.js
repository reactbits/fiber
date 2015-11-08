'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Avatar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _gravatar = require('./gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO get gravatars if source is email

var avatarSize = {
	small: 24,
	sm: 24,
	s: 24,
	normal: 32,
	medium: 32,
	m: 32,
	large: 40,
	l: 40,
	xl: 64
};

var defaultSize = 32;

var mapSize = function mapSize(value) {
	return (_lodash2.default.isString(value) ? avatarSize[value.toLowerCase()] : value) || defaultSize;
};

var avatarURL = function avatarURL(url) {
	if (_is2.default.email(url)) {
		return (0, _gravatar2.default)(url);
	}
	return url;
};

var Avatar = function Avatar(props) {
	// TODO circled
	// TODO shadow
	var className = _style2.default.avatar;
	var url = avatarURL(props.source);
	var avatarStyle = Object.assign({}, props.style || {});
	var size = mapSize(props.size);
	avatarStyle.marginLeft = -(size + 8);
	return _react2.default.createElement('img', {
		className: 'avatar ' + className, style: avatarStyle,
		src: url, width: size, height: size
	});
};

exports.default = Avatar;
exports.Avatar = Avatar;