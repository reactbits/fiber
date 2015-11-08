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
	if (!value || _lodash2.default.isString(value)) return '';
	if (isToday(value)) {
		return (0, _moment2.default)(value).fromNow();
	}
	return (0, _moment2.default)(value).format('HH:mm');
};

var Message = function Message(props) {
	var data = props.data || props;
	var time = getTime(data);
	var ts = formatTime(time);
	var timeClass = 'time ' + _style2.default.time;
	if (isToday(time)) timeClass += ' ' + _style2.default.today;
	return _react2.default.createElement(
		'div',
		{ className: 'message ' + _style2.default.message },
		data.avatar ? _react2.default.createElement(_avatar2.default, { source: data.avatar, size: props.avatarSize }) : null,
		_react2.default.createElement(
			'div',
			{ className: _style2.default.header },
			data.name ? _react2.default.createElement(
				'span',
				{ className: 'name ' + _style2.default.name },
				data.name
			) : null,
			time ? _react2.default.createElement(
				'span',
				{ className: timeClass },
				ts
			) : null
		),
		_react2.default.createElement(_markdown2.default, { source: data.body })
	);
};

exports.default = Message;
exports.Message = Message;
exports.getTime = getTime;