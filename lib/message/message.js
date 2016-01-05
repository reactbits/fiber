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

var _username = require('./username');

var _username2 = _interopRequireDefault(_username);

var _age = require('./age');

var _age2 = _interopRequireDefault(_age);

var _action = require('./action');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

var getTime = function getTime(msg) {
	var t = msg.updated_at || msg.created_at || msg.time;
	if (!t) return null;
	var d = new Date(t);
	return isNaN(d.getTime()) ? null : d;
};

var Message = function Message(props) {
	var className = 'message ' + _style2.default.message + ' ' + props.className;
	if (!!props.isReply) className += ' ' + _style2.default.reply;
	var data = props.data || props;
	var user = data.user;
	var time = getTime(data);
	var likes = data.likes || 0;

	var fetchUser = (0, _util.promiseOnce)(data.fetchUser || props.fetchUser, data);
	var avatar = (0, _util.getOrFetch)(fetchUser, user, 'avatar', 'avatar_url');
	var userName = (0, _util.getOrFetch)(fetchUser, user, 'name', 'login');

	// TODO support data.replies as promise
	var replies = data.replies || [];

	// TODO render admin badge
	// TODO customize action glyph icons (fa, etc)
	// TODO spam icon
	// TODO render replies on reply count click or message click

	var replyElements = replies.map(function (d) {
		return _react2.default.createElement(Message, { key: d.id, data: d, isReply: true, avatarSize: props.avatarSize, onAction: props.onAction });
	});

	// TODO allow to hide unused actions
	var actions = {
		reply: { count: replies.length },
		like: { count: likes },
		remove: { right: true },
		star: { right: true }
	};

	var actionProps = {
		onAction: props.onAction,
		iconSet: props.iconSet
	};

	return _react2.default.createElement(
		'div',
		{ className: className, 'data-id': data.id },
		avatar ? _react2.default.createElement(_avatar2.default, { source: avatar, size: props.avatarSize, name: userName }) : null,
		_react2.default.createElement(
			'div',
			{ className: 'meta ' + _style2.default.meta },
			userName ? _react2.default.createElement(_username2.default, { name: userName }) : null,
			time ? _react2.default.createElement(_age2.default, { time: time }) : null,
			_react2.default.createElement(
				'span',
				{ className: 'actions' },
				(0, _action.renderActions)(actions, data, actionProps)
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