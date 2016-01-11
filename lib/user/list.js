'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UserList = UserList;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserList(props) {
	var users = props.users || [];
	var online = users.filter(function (u) {
		return !!u.online;
	}).length;
	var items = users.map(function (user) {
		var avatarProps = {
			user: user,
			className: _style2.default.user_item,
			hover: 'grow',
			shape: 'round_rect',
			size: 32,
			style: {
				margin: 0
			}
		};
		return _react2.default.createElement(_avatar2.default, _extends({ key: user.id }, avatarProps));
	});
	return _react2.default.createElement(
		'div',
		{ className: _style2.default.user_list },
		_react2.default.createElement(
			'div',
			{ className: _style2.default.user_list_header },
			_react2.default.createElement('i', { className: 'ion-ios-people' }),
			_react2.default.createElement(
				'span',
				null,
				'Online'
			),
			_react2.default.createElement(
				'em',
				{ className: _style2.default.online_count },
				online
			)
		),
		_react2.default.createElement(
			'div',
			{ className: _style2.default.user_list_body },
			items
		)
	);
}

exports.default = UserList;