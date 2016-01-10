'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Message = exports.getTime = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _avatar = require('../avatar');

var _markdown = require('../markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var _username = require('./username');

var _username2 = _interopRequireDefault(_username);

var _age = require('./age');

var _age2 = _interopRequireDefault(_age);

var _messageinput = require('./messageinput');

var _messageinput2 = _interopRequireDefault(_messageinput);

var _action = require('./action');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO unread style
// TODO custom background
// TODO button with menu (reply, delete, star, like, etc)

var getTime = exports.getTime = function getTime(msg) {
	var t = msg.updated_at || msg.created_at || msg.time;
	if (!t) return null;
	var d = new Date(t);
	return isNaN(d.getTime()) ? null : d;
};

var Message = exports.Message = (function (_Component) {
	_inherits(Message, _Component);

	function Message(props) {
		_classCallCheck(this, Message);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Message).call(this, props));

		_this.state = {
			showReplyInput: false,
			showEdit: false
		};
		return _this;
	}

	_createClass(Message, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var className = (0, _classnames2.default)('message', _style2.default.message, props.className, _defineProperty({}, _style2.default.reply, !!props.isReply));
			var data = props.data || props;
			var user = data.user;
			var time = getTime(data);
			var likes = data.likes || 0;
			var fetchUser = (0, _util.promiseOnce)(data.fetchUser || props.fetchUser, data);
			var avatar = (0, _util.getOrFetch)(fetchUser, user, 'avatar', 'avatar_url');
			var userName = (0, _util.getOrFetch)(fetchUser, user, 'name', 'login');

			var bodyProps = {
				className: (0, _classnames2.default)('message-body', _style2.default.message_body),
				style: {
					minHeight: (0, _avatar.avatarSize)(props.avatarSize) - 16
				}
			};

			// TODO support data.replies as promise
			var replies = data.replies || [];

			// TODO render admin badge
			// TODO customize action glyph icons (fa, etc)
			// TODO spam icon
			// TODO render replies on reply count click or message click

			var replyElements = replies.map(function (d) {
				var replyProps = {
					data: d,
					isReply: true,
					avatarSize: props.avatarSize,
					fetchUser: fetchUser,
					onAction: props.onAction,
					canExecute: props.canExecute,
					sendMessage: props.sendMessage,
					updateMessage: props.updateMessage
				};
				return _react2.default.createElement(Message, _extends({ key: d.id }, replyProps));
			});

			var showReply = function showReply() {
				_this2.setState({ showReplyInput: true, showEdit: false });
			};

			var showEdit = function showEdit() {
				_this2.setState({ showEdit: true, showReplyInput: false });
			};

			// TODO allow to hide unused actions
			var actions = {
				reply: { count: replies.length, onAction: showReply },
				like: { count: likes },
				star: { right: true },
				remove: { right: true },
				edit: { right: true, onAction: showEdit }
			};

			var actionProps = {
				onAction: props.onAction,
				canExecute: props.canExecute,
				iconSet: props.iconSet
			};

			var replyInput = null;

			if (this.state.showReplyInput) {
				(function () {
					var hideReplyInput = function hideReplyInput() {
						_this2.setState({ showReplyInput: false });
					};
					var sendReply = function sendReply(text) {
						hideReplyInput();
						if (_lodash2.default.isFunction(props.sendMessage)) {
							props.sendMessage({ thread_id: data.thread_id, in_reply_to: data.id, body: text });
						}
					};
					replyInput = _react2.default.createElement(_messageinput2.default, { submit: sendReply, cancel: hideReplyInput, focused: true });
				})();
			}

			var editor = null;

			if (this.state.showEdit) {
				(function () {
					var hideEdit = function hideEdit() {
						_this2.setState({ showEdit: false });
					};
					var updateMessage = function updateMessage(text) {
						hideEdit();
						if (_lodash2.default.isFunction(props.updateMessage)) {
							props.updateMessage({ thread_id: data.thread_id, id: data.id, body: text });
						}
					};
					editor = _react2.default.createElement(_messageinput2.default, { submit: updateMessage, cancel: hideEdit, focused: true, value: data.body });
				})();
			}

			return _react2.default.createElement(
				'div',
				{ className: className, 'data-id': data.id },
				avatar ? _react2.default.createElement(_avatar.Avatar, { source: avatar, size: props.avatarSize, name: userName }) : null,
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('meta', _style2.default.meta) },
					userName ? _react2.default.createElement(_username2.default, { name: userName }) : null,
					time ? _react2.default.createElement(_age2.default, { time: time }) : null,
					_react2.default.createElement(
						'span',
						{ className: (0, _classnames2.default)('actions', _style2.default.actions) },
						(0, _action.renderActions)(actions, data, actionProps)
					)
				),
				_react2.default.createElement(
					'div',
					bodyProps,
					_react2.default.createElement(_markdown2.default, { source: data.body })
				),
				replyInput,
				editor,
				replyElements
			);
		}
	}]);

	return Message;
})(_react.Component);

Message.propTypes = {
	className: _react.PropTypes.string,
	data: _react.PropTypes.object,
	avatarSize: _avatar.Avatar.propTypes.size,
	isReply: _react.PropTypes.bool
};
Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: '',
	isReply: false
};
exports.default = Message;