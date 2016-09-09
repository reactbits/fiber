'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _observable = require('observable');

var _observable2 = _interopRequireDefault(_observable);

var _message = require('../message');

var _action = require('../message/action');

var _contributors = require('./contributors');

var _contributors2 = _interopRequireDefault(_contributors);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO allow to use custom MessageInput component
var Thread = function (_Component) {
	_inherits(Thread, _Component);

	function Thread(props) {
		_classCallCheck(this, Thread);

		var _this = _possibleConstructorReturn(this, (Thread.__proto__ || Object.getPrototypeOf(Thread)).call(this, props));

		_this.state = {
			collapsed: true
		};
		return _this;
	}

	_createClass(Thread, [{
		key: 'renderActions',
		value: function renderActions() {
			var props = this.props;

			var actions = {
				like: { count: props.likes || 0 },
				remove: {},
				star: {}
			};

			var actionProps = {
				onAction: props.onAction,
				canExecute: props.canExecute,
				iconSet: props.iconSet
			};

			return (0, _action.renderActions)(actions, 'thread', props, actionProps);
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var _this2 = this;

			var props = this.props;
			var subject = props.subject || props.topic;
			var className = (0, _classnames2.default)(_style2.default.thread_header);
			var count = (0, _util.countMessages)(props.messages || []) || 0;
			var collapse = function collapse() {
				_this2.setState({ collapsed: !_this2.state.collapsed });
			};
			return _react2.default.createElement(
				'div',
				{ className: className },
				_react2.default.createElement(
					'a',
					{ onClick: collapse },
					subject
				),
				_react2.default.createElement(_message.Counter, { count: count, title: count + ' messages' }),
				_react2.default.createElement(
					'span',
					{ className: (0, _classnames2.default)(_style2.default.actions) },
					this.renderActions()
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var className = (0, _classnames2.default)(_style2.default.thread, this.props.className);
			var messages = this.props.messages || [];
			var items = [];

			if (this.state.collapsed) {
				var users = (0, _observable2.default)([]);
				(0, _util.collectContributors)(users, messages, this.props.fetchUser);
				items.push(_react2.default.createElement(_contributors2.default, { key: 'cl-' + this.props.id, users: users }));
			} else {
				(function () {
					var collapseDay = function collapseDay(time) {
						var k = 'collapsedDay' + +time;
						_this3.setState(_defineProperty({}, k, !_this3.state[k]));
					};

					var isCollapsedDay = function isCollapsedDay(time) {
						var k = 'collapsedDay' + +time;
						return !!_this3.state[k];
					};

					var makeDay = function makeDay(time, msgcount) {
						var dayProps = {
							time: time,
							count: msgcount,
							onClick: function onClick() {
								return collapseDay(time);
							}
						};
						return _react2.default.createElement(_day2.default, _extends({ key: 'day-' + _this3.props.id + '-' + +time }, dayProps));
					};

					// TODO make renderMessage as method
					var renderMessage = function renderMessage(msg) {
						var msgProps = {
							data: msg,
							avatarSize: _this3.props.avatarSize,
							iconSet: _this3.props.iconSet,
							fetchUser: _this3.props.fetchUser,
							onAction: _this3.props.onAction,
							canExecute: _this3.props.canExecute,
							sendMessage: _this3.props.sendMessage,
							updateMessage: _this3.props.updateMessage,
							theme: _this3.props.theme
						};
						return _react2.default.createElement(_message.Message, _extends({ key: msg.id }, msgProps));
					};

					var collapseMessages = false;
					for (var i = 0; i < messages.length; i += 1) {
						var msg = messages[i];
						var time = (0, _message.getTime)(msg);
						var day = (0, _util.getDay)(time);
						if (_moment2.default.isDate(time) && (i === 0 || day !== (0, _util.getMsgDay)(messages[i - 1]))) {
							collapseMessages = isCollapsedDay(time);
							var dayMessages = (0, _util.getDayMessages)(messages, i);
							var msgcount = (0, _util.countMessages)(dayMessages);
							items.push(makeDay(time, msgcount));
						}
						if (!collapseMessages) {
							items.push(renderMessage(msg));
						}
					}

					var sendMessage = function sendMessage(body) {
						if (_lodash2.default.isFunction(_this3.props.sendMessage)) {
							_this3.props.sendMessage({ thread_id: _this3.props.id, body: body });
						}
					};

					items.push(_react2.default.createElement(_message.MessageInput, { key: 'message-input-' + _this3.props.id, submit: sendMessage }));
				})();
			}

			return _react2.default.createElement(
				'div',
				{ className: className },
				this.renderHeader(),
				items
			);
		}
	}]);

	return Thread;
}(_react.Component);

Thread.propTypes = {
	className: _react.PropTypes.string,
	avatarSize: _avatar2.default.propTypes.size,
	fetchUser: _react.PropTypes.func,
	theme: _react.PropTypes.string
};
Thread.defaultProps = {
	className: '',
	topic: '',
	messages: [],
	theme: 'plain'
};
exports.default = Thread;