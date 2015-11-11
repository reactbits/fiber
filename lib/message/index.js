'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTime = exports.Message = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _markdown = require('../markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

var getTime = function getTime(msg) {
	return msg.updated_at || msg.created_at || msg.time;
};

var isToday = function isToday(value) {
	if (!_moment2.default.isDate(value)) return false;
	var now = (0, _moment2.default)();
	var m = (0, _moment2.default)(value);
	return m.year() === now.year() && m.dayOfYear() === now.dayOfYear();
};

var formatTime = function formatTime(value) {
	if (!value) {
		return '';
	}
	if (_lodash2.default.isString(value)) {
		return value;
	}
	if (isToday(value)) {
		return (0, _moment2.default)(value).fromNow();
	}
	return (0, _moment2.default)(value).format('HH:mm');
};

var Age = function Age(_ref) {
	var time = _ref.time;

	var text = formatTime(time);

	var className = 'time ' + _style2.default.time;
	if (isToday(time)) {
		className += ' ' + _style2.default.today;
	}

	var attrs = {
		className: className
	};

	if (_moment2.default.isDate(time)) {
		attrs['data-toggle'] = 'tooltip';
		attrs.title = (0, _moment2.default)(time).format('ddd MMM D YYYY HH:mm:ss');
	}

	return _react2.default.createElement(
		'span',
		attrs,
		text
	);
};

var Message = function Message(props) {
	var className = 'message ' + _style2.default.message + ' ' + props.className;
	var data = props.data || props;
	var time = getTime(data);
	return _react2.default.createElement(
		'div',
		{ className: className },
		data.avatar ? _react2.default.createElement(_avatar2.default, { source: data.avatar, size: props.avatarSize, name: data.name }) : null,
		_react2.default.createElement(
			'div',
			{ className: _style2.default.header },
			data.name ? _react2.default.createElement(
				'span',
				{ className: 'name ' + _style2.default.name },
				data.name
			) : null,
			time ? _react2.default.createElement(Age, { time: time }) : null
		),
		_react2.default.createElement(_markdown2.default, { source: data.body })
	);
};

Message.propTypes = {
	className: _react2.default.PropTypes.string,
	data: _react2.default.PropTypes.object,
	avatarSize: _react2.default.PropTypes.string
};

Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: ''
};

exports.default = Message;
exports.Message = Message;
exports.getTime = getTime;