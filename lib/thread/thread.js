'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Thread = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _message = require('../message');

var _contributors = require('./contributors');

var _contributors2 = _interopRequireDefault(_contributors);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _observable = require('observable');

var _observable2 = _interopRequireDefault(_observable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Header = function Header(props) {
	var className = (0, _classnames2.default)('thread-header', _style2.default.thread_header);
	return _react2.default.createElement(
		'a',
		{ className: className, onClick: props.onClick },
		_react2.default.createElement(
			'span',
			null,
			props.text
		),
		_react2.default.createElement(_message.Counter, { count: props.count || 0 })
	);
};

var getDay = function getDay(time) {
	var m = (0, _moment2.default)(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
};

var getMsgDay = function getMsgDay(msg) {
	return getDay((0, _message.getTime)(msg));
};

function getDayMessages(messages, start) {
	var msg = messages[start];
	var result = [msg];
	var day = getMsgDay(msg);
	for (var i = start + 1; i < messages.length; i++) {
		if (day !== getMsgDay(messages[i])) {
			i--;
			break;
		}
		result.push(messages[i]);
	}
	return result;
}

function countMessages(messages) {
	var countIt = function countIt(m) {
		var n = 1;
		if (Array.isArray(m.replies)) {
			n += m.replies.reduce(function (a, b) {
				return a + countIt(b);
			}, 0);
		}
		return n;
	};
	return messages.reduce(function (a, m) {
		return a + countIt(m);
	}, 0);
}

function collectContributors(users, messages, fetchUser) {
	function push(user) {
		var arr = users();
		if (_lodash2.default.find(arr, function (u) {
			return u.id === user.id;
		})) return;
		users([].concat(_toConsumableArray(arr), [user]));
	}
	messages.forEach(function (m) {
		if (_lodash2.default.isObject(m.user)) {
			push(m.user);
		} else if (m.fetchUser || fetchUser) {
			var promise = (0, _util.toPromise)((0, _util.promiseOnce)(m.fetchUser || fetchUser, m));
			if (promise) {
				promise.then(push);
			}
		}
		if (_lodash2.default.isArray(m.replies)) {
			collectContributors(users, m.replies, fetchUser);
		}
	});
}

// TODO allow to use custom MessageInput component

var Thread = exports.Thread = (function (_Component) {
	_inherits(Thread, _Component);

	function Thread(props) {
		_classCallCheck(this, Thread);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Thread).call(this, props));

		_this.state = {
			collapsed: true
		};
		return _this;
	}

	_createClass(Thread, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var className = (0, _classnames2.default)('thread', _style2.default.thread, props.className);
			var subject = props.subject || props.topic;
			var messages = props.messages || [];
			var items = [];

			if (this.state.collapsed) {
				var users = (0, _observable2.default)([]);
				collectContributors(users, messages, props.fetchUser);
				items.push(_react2.default.createElement(_contributors2.default, { key: 'cl-' + props.id, users: users }));
			} else {
				(function () {
					var collapseDay = function collapseDay(time) {
						var k = 'collapsedDay' + +time;
						_this2.setState(_defineProperty({}, k, !_this2.state[k]));
					};

					var isCollapsedDay = function isCollapsedDay(time) {
						var k = 'collapsedDay' + +time;
						return !!_this2.state[k];
					};

					var makeDay = function makeDay(time, msgcount) {
						var dayProps = {
							time: time,
							count: msgcount,
							onClick: function onClick() {
								return collapseDay(time);
							}
						};
						return _react2.default.createElement(_day2.default, _extends({ key: 'day-' + props.id + '-' + +time }, dayProps));
					};

					var renderMessage = function renderMessage(msg) {
						var msgProps = {
							data: msg,
							avatarSize: props.avatarSize,
							iconSet: props.iconSet,
							fetchUser: props.fetchUser,
							onAction: props.onAction,
							canExecute: props.canExecute,
							sendMessage: props.sendMessage,
							updateMessage: props.updateMessage
						};
						return _react2.default.createElement(_message.Message, _extends({ key: msg.id }, msgProps));
					};

					var collaseMessages = false;
					for (var i = 0; i < messages.length; i++) {
						var msg = messages[i];
						var time = (0, _message.getTime)(msg);
						var day = getDay(time);
						if (_moment2.default.isDate(time) && (i === 0 || day !== getMsgDay(messages[i - 1]))) {
							collaseMessages = isCollapsedDay(time);
							var dayMessages = getDayMessages(messages, i);
							var msgcount = countMessages(dayMessages);
							items.push(makeDay(time, msgcount));
						}
						if (collaseMessages) continue;
						items.push(renderMessage(msg));
					}

					var sendMessage = function sendMessage(body) {
						if (_lodash2.default.isFunction(props.sendMessage)) {
							props.sendMessage({ thread_id: props.id, body: body });
						}
					};

					items.push(_react2.default.createElement(_message.MessageInput, { key: 'message-input-' + props.id, submit: sendMessage }));
				})();
			}

			var collapse = function collapse() {
				_this2.setState({ collapsed: !_this2.state.collapsed });
			};
			var headerProps = {
				text: subject,
				onClick: collapse,
				count: countMessages(messages)
			};

			return _react2.default.createElement(
				'div',
				{ className: className },
				subject ? _react2.default.createElement(Header, headerProps) : null,
				items
			);
		}
	}]);

	return Thread;
})(_react.Component);

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