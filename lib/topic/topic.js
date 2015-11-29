'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TopicList = exports.Topic = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatTime = function formatTime(value) {
	if (!value) {
		return '';
	}
	return (0, _moment2.default)(value).format('HH:mm');
};

// TODO reuse rendering of user name from message component

var Topic = function Topic(props) {
	var className = 'topic ' + _style2.default.topic;
	if (props.selected) className += ' ' + _style2.default.topic_selected;

	var user = props.user;
	var unread = props.unread ? (props.unread > 10 ? '10+' : props.unread) + ' new' : '';

	return _react2.default.createElement(
		'div',
		{ className: className },
		user && user.avatar ? _react2.default.createElement(_avatar2.default, { source: user.avatar, size: props.avatarSize, name: user.name }) : null,
		_react2.default.createElement(
			'div',
			{ className: 'header ' + _style2.default.header },
			_react2.default.createElement(
				'span',
				null,
				props.title
			),
			unread ? _react2.default.createElement(
				'span',
				{ className: 'unread ' + _style2.default.unread },
				unread
			) : null
		),
		_react2.default.createElement(
			'div',
			{ className: 'body ' + _style2.default.body },
			props.message
		),
		_react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'span',
				{ className: _style2.default.user_name },
				user.name
			),
			_react2.default.createElement(
				'span',
				{ className: _style2.default.time },
				' at ' + formatTime(props.updated_at)
			)
		)
	);
};

var TopicList = function TopicList(props) {
	var items = props.items.map(function (t) {
		return _react2.default.createElement(Topic, t);
	});
	return _react2.default.createElement(
		'div',
		{ className: 'topic_list ' + _style2.default.topic_list },
		items
	);
};

exports.default = TopicList;
exports.Topic = Topic;
exports.TopicList = TopicList;