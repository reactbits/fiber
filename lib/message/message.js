'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Message = exports.getTime = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Message = exports.Message = function (_Component) {
	_inherits(Message, _Component);

	function Message(props) {
		_classCallCheck(this, Message);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Message).call(this, props));

		_this.state = {
			showReplyInput: false,
			showEdit: false,
			collapsed: false
		};
		return _this;
	}

	_createClass(Message, [{
		key: 'renderReplyInput',
		value: function renderReplyInput() {
			var _this2 = this;

			if (!this.state.showReplyInput) return null;
			var props = this.props;
			var data = props.data || props;
			var hideReplyInput = function hideReplyInput() {
				_this2.setState({ showReplyInput: false });
			};
			var sendReply = function sendReply(text) {
				hideReplyInput();
				if (_lodash2.default.isFunction(props.sendMessage)) {
					props.sendMessage({ thread_id: data.thread_id, in_reply_to: data.id, body: text });
				}
			};
			return _react2.default.createElement(_messageinput2.default, { submit: sendReply, cancel: hideReplyInput, focused: true });
		}
	}, {
		key: 'renderEditor',
		value: function renderEditor() {
			var _this3 = this;

			if (!this.state.showEdit) return null;
			var props = this.props;
			var data = props.data || props;
			var hideEdit = function hideEdit() {
				_this3.setState({ showEdit: false });
			};
			var updateMessage = function updateMessage(text) {
				hideEdit();
				if (_lodash2.default.isFunction(props.updateMessage)) {
					props.updateMessage({ thread_id: data.thread_id, id: data.id, body: text });
				}
			};
			return _react2.default.createElement(_messageinput2.default, { submit: updateMessage, cancel: hideEdit, focused: true, value: data.body });
		}
	}, {
		key: 'renderActions',
		value: function renderActions() {
			var _this4 = this;

			var props = this.props;
			var data = props.data || props;
			var replies = data.replies || [];

			var showReply = function showReply() {
				_this4.setState({ showReplyInput: true, showEdit: false });
			};

			var showEdit = function showEdit() {
				_this4.setState({ showEdit: true, showReplyInput: false });
			};

			var actions = {
				reply: { count: replies.length, onAction: showReply },
				like: { count: data.likes || 0 },
				edit: { onAction: showEdit },
				remove: {},
				star: {}
			};

			var actionProps = {
				onAction: props.onAction,
				canExecute: props.canExecute,
				iconSet: props.iconSet
			};

			return (0, _action.renderActions)(actions, 'message', data, actionProps);
		}
	}, {
		key: 'renderReplies',
		value: function renderReplies(fetchUser) {
			var props = this.props;
			var data = props.data || props;
			// TODO support data.replies as promise
			var replies = data.replies || [];

			return (this.state.collapsed ? [] : replies).map(function (d) {
				var replyProps = {
					data: d,
					isReply: true,
					avatarSize: props.avatarSize,
					fetchUser: fetchUser,
					onAction: props.onAction,
					canExecute: props.canExecute,
					sendMessage: props.sendMessage,
					updateMessage: props.updateMessage,
					theme: props.theme
				};
				return _react2.default.createElement(Message, _extends({ key: d.id }, replyProps));
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var props = this.props;
			var className = (0, _classnames2.default)(_style2.default.message, props.className, _style2.default[props.theme], _defineProperty({}, _style2.default.reply, !!props.isReply));
			var data = props.data || props;
			var user = data.user;
			var time = getTime(data);
			var fetchUser = (0, _util.promiseOnce)(data.fetchUser || props.fetchUser, data);
			var userName = (0, _util.getOrFetch)(fetchUser, user, 'name', 'login');

			var outerAvatar = props.theme === 'github';
			var avatarProps = {
				user: user || fetchUser,
				size: props.avatarSize,
				circled: props.theme === 'plain',
				style: {
					float: 'left'
				}
			};

			var bodyProps = {
				className: (0, _classnames2.default)(_style2.default.message_body),
				style: {
					minHeight: (0, _avatar.avatarSize)(props.avatarSize) - 16
				}
			};

			// TODO render badges
			// TODO spam icon
			var toggleIconProps = {
				className: this.state.collapsed ? 'fa fa-plus-square-o' : 'fa fa-minus-square-o',
				onClick: function onClick() {
					return _this5.setState({ collapsed: !_this5.state.collapsed });
				}
			};

			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)(_style2.default.message_wrapper, _style2.default[props.theme]) },
				outerAvatar ? _react2.default.createElement(_avatar.Avatar, avatarProps) : null,
				_react2.default.createElement(
					'div',
					{ className: className, 'data-id': data.id },
					outerAvatar ? null : _react2.default.createElement(_avatar.Avatar, avatarProps),
					_react2.default.createElement(
						'div',
						{ className: (0, _classnames2.default)(_style2.default.meta) },
						_react2.default.createElement('i', toggleIconProps),
						userName ? _react2.default.createElement(_username2.default, { name: userName }) : null,
						time ? _react2.default.createElement(_age2.default, { time: time }) : null,
						_react2.default.createElement(
							'span',
							{ className: (0, _classnames2.default)(_style2.default.actions) },
							this.renderActions()
						)
					),
					this.state.collapsed ? null : _react2.default.createElement(
						'div',
						bodyProps,
						_react2.default.createElement(_markdown2.default, { source: data.body })
					),
					this.renderReplyInput(),
					this.renderEditor(),
					this.renderReplies(fetchUser)
				)
			);
		}
	}]);

	return Message;
}(_react.Component);

Message.propTypes = {
	className: _react.PropTypes.string,
	data: _react.PropTypes.object,
	avatarSize: _avatar.Avatar.propTypes.size,
	isReply: _react.PropTypes.bool,
	theme: _react.PropTypes.string
};
Message.defaultProps = {
	className: '',
	data: {},
	avatarSize: '',
	isReply: false,
	theme: 'plain'
};
exports.default = Message;