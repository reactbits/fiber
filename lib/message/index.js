'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.actionIcon = exports.getTime = exports.Message = undefined;

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

var UserName = function UserName(props) {
	var className = 'name ' + _style2.default.name;
	return _react2.default.createElement(
		'span',
		{ className: className },
		props.name
	);
};

var actionIcon = {
	like: 'fa fa-heart',
	replies: 'fa fa-comment',
	star: 'fa fa-star'
};

var Message = function Message(props) {
	var className = 'message ' + _style2.default.message + ' ' + props.className;
	if (!!props.isReply) className += ' ' + _style2.default.reply;
	var data = props.data || props;
	var time = getTime(data);
	var likes = data.likes || 0;

	// TODO support data.replies as promise
	var replies = data.replies || [];
	// TODO render admin badge
	// TODO customize action glyph icons (fa, etc)
	// TODO spam icon
	// TODO render replies on reply count click or message click
	var replyElements = replies.map(function (d) {
		return _react2.default.createElement(Message, { key: d.id, data: d, avatarSize: props.avatarSize, isReply: true });
	});
	return _react2.default.createElement(
		'div',
		{ className: className, 'data-id': data.id },
		data.avatar ? _react2.default.createElement(_avatar2.default, { source: data.avatar, size: props.avatarSize, name: data.name }) : null,
		_react2.default.createElement(
			'div',
			{ className: 'meta ' + _style2.default.meta },
			data.name ? _react2.default.createElement(UserName, { name: data.name }) : null,
			time ? _react2.default.createElement(Age, { time: time }) : null,
			_react2.default.createElement(
				'span',
				{ className: 'actions' },
				replies.length > 0 ? _react2.default.createElement(
					'span',
					{ className: 'reply-count' },
					_react2.default.createElement('i', { className: actionIcon.replies }),
					_react2.default.createElement(
						'span',
						null,
						replies.length
					)
				) : null,
				_react2.default.createElement(
					'a',
					{ className: 'action action-like' },
					_react2.default.createElement('i', { className: actionIcon.like }),
					likes > 0 ? _react2.default.createElement(
						'span',
						null,
						likes
					) : null
				),
				_react2.default.createElement(
					'a',
					{ className: 'action action-star pull-right' },
					_react2.default.createElement('i', { className: actionIcon.star })
				)
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'body' },
			_react2.default.createElement(_markdown2.default, { source: data.body })
		),
		replyElements
	);
};

Message.propTypes = {
	className: _react.PropTypes.string,
	data: _react.PropTypes.object,
	avatarSize: _avatar2.default.propTypes.size,
	isReply: _react.PropTypes.bool
};

Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: '',
	isReply: false
};

exports.default = Message;
exports.Message = Message;
exports.getTime = getTime;
exports.actionIcon = actionIcon;