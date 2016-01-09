'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ThreadList = exports.Topic = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _thread = require('./thread');

var _thread2 = _interopRequireDefault(_thread);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatTime = function formatTime(value) {
	if (!value) {
		return '';
	}
	return (0, _moment2.default)(value).format('HH:mm');
};

// TODO reuse rendering of user name from message component

var Topic = exports.Topic = function Topic(props) {
	var className = 'topic ' + _style2.default.topic;
	if (props.selected) className += ' ' + _style2.default.topic_selected;

	var msg = props.last_message || props.message || {};
	var user = msg.user;
	var unread = props.unread ? (props.unread > 10 ? '10+' : props.unread) + ' new' : '';
	var avatarURL = user ? user.avatar_url || user.avatar : null;

	var onClick = function onClick(e) {
		e.preventDefault();
		if (_lodash2.default.isFunction(props.onSelect)) {
			props.onSelect(props.thread);
		}
	};

	return _react2.default.createElement(
		'div',
		{ className: className, onClick: onClick },
		avatarURL ? _react2.default.createElement(_avatar2.default, { source: avatarURL, size: props.avatarSize, name: user.name }) : null,
		_react2.default.createElement(
			'div',
			{ className: 'header ' + _style2.default.header },
			_react2.default.createElement(
				'span',
				null,
				props.topic
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
			msg.body
		),
		_react2.default.createElement(
			'div',
			null,
			user && user.name ? _react2.default.createElement(
				'span',
				{ className: _style2.default.user_name },
				user.name
			) : null,
			_react2.default.createElement(
				'span',
				{ className: _style2.default.time },
				' at ' + formatTime(props.updated_at)
			)
		)
	);
};

function selectProps(props) {
	for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		names[_key - 1] = arguments[_key];
	}

	var pairs = names.map(function (k) {
		return props.hasOwnProperty(k) ? _defineProperty({}, k, props[k]) : undefined;
	});
	return pairs.filter(function (t) {
		return t !== undefined;
	}).reduce(function (a, b) {
		return Object.assign(a, b);
	}, {});
}

// TODO render only topic in collapsed mode

var ThreadList = exports.ThreadList = function ThreadList(props) {
	var className = (0, _classnames2.default)('thread-list', _style2.default.thread_list);
	// TODO use propTypes of Thread component
	var options = selectProps(props, 'avatarSize', 'iconSet', 'fetchUser', 'sendMessage', 'updateMessage', 'onSelect', 'onAction');
	var items = props.threads.map(function (t) {
		return _react2.default.createElement(_thread2.default, _extends({ key: t.id }, t, options));
		// return <Topic key={t.id} thread={t} {...t} onSelect={props.onSelect}/>;
	});
	return _react2.default.createElement(
		'div',
		{ className: className },
		items
	);
};

exports.default = ThreadList;