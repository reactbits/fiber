'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Avatar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _ClipLoader = require('halogen/ClipLoader');

var _ClipLoader2 = _interopRequireDefault(_ClipLoader);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _gravatar = require('./gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function preloader() {
	var css = {
		marginLeft: 16,
		marginTop: 16
	};
	return _react2.default.createElement(
		'div',
		{ style: css },
		_react2.default.createElement(_ClipLoader2.default, { color: '#4DAF7C', size: '32px' })
	);
}

var RandomAvatar = function RandomAvatar(props) {
	// TODO render random avatar
	var size = props.size;
	return _react2.default.createElement('img', { src: (0, _gravatar2.default)(props.src), width: size, height: size });
};

var Avatar = function Avatar(props) {
	// TODO circled
	// TODO shadow
	var className = _style2.default.avatar;
	var src = avatarURL(props.source);
	var size = mapSize(props.size);
	var avatarStyle = Object.assign({}, props.style || {}, {
		marginLeft: -(size + 8)
	});

	var imgProps = {
		width: size,
		height: size
	};

	return _react2.default.createElement(
		_reactImageloader2.default,
		{ className: 'avatar ' + className, style: avatarStyle,
			src: src, wrapper: _react2.default.DOM.div, preloader: preloader, imgProps: imgProps },
		_react2.default.createElement(RandomAvatar, { src: src, size: size })
	);
};

exports.default = Avatar;
exports.Avatar = Avatar;