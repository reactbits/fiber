'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Thread = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _message = require('../message');

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function Text(props) {
	return _react2.default.createElement(
		'div',
		{ className: props.className },
		props.text || ''
	);
};

var Topic = function Topic(props) {
	return _react2.default.createElement(Text, { className: 'topic ' + _style2.default.topic, text: props.text });
};

var getDay = function getDay(msg) {
	var time = (0, _message.getTime)(msg);
	return _moment2.default.isDate(time) ? (0, _moment2.default)(time).dayOfYear() : -1;
};

var formatDay = function formatDay(time) {
	var now = (0, _moment2.default)();
	var day = now.dayOfYear();
	var m = (0, _moment2.default)(time);
	// this year
	if (m.year() === now.year()) {
		if (m.dayOfYear() === day) {
			// TODO localization
			return 'Today';
		}
		if (m.dayOfYear() === day - 1) {
			// TODO localization
			return 'Yesterday';
		}
		// this week
		if (m.week() === now.week()) {
			return m.format('dddd');
		}
		return m.format('MMMM D, dddd');
	}
	return m.format('MMMM D YYYY, dddd');
};

var Day = function Day(props) {
	var time = (0, _message.getTime)(props.message || {});
	var text = formatDay(time);
	return _react2.default.createElement(Text, { className: 'day ' + _style2.default.day, text: text });
};

var Thread = function Thread(props) {
	var className = 'thread ' + _style2.default.thread + ' ' + props.className;
	var messages = props.messages || [];
	var items = [];
	for (var i = 0; i < messages.length; i++) {
		var msg = messages[i];
		var time = (0, _message.getTime)(msg);
		if (_moment2.default.isDate(time) && (i === 0 || getDay(msg) !== getDay(messages[i - 1]))) {
			items.push(_react2.default.createElement(Day, { key: +time, message: msg }));
		}
		var elem = _react2.default.createElement(_message.Message, { key: msg.id, data: msg,
			avatarSize: props.avatarSize,
			fetchUser: props.fetchUser,
			onAction: props.onAction
		});
		items.push(elem);
	}
	return _react2.default.createElement(
		'div',
		{ className: className },
		props.topic ? _react2.default.createElement(Topic, { text: props.topic }) : null,
		items
	);
};

Thread.propTypes = {
	className: _react.PropTypes.string,
	topic: _react.PropTypes.string,
	messages: _react.PropTypes.array,
	avatarSize: _avatar2.default.propTypes.size,
	fetchUser: _react.PropTypes.func
};

Thread.defaultProps = {
	className: '',
	topic: '',
	messages: []
};

exports.default = Thread;
exports.Thread = Thread;