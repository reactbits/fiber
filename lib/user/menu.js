'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _common = require('../common');

var _menu = require('./menu.scss');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO use UserName component to render user name

var UserMenu = function (_Component) {
	_inherits(UserMenu, _Component);

	function UserMenu() {
		_classCallCheck(this, UserMenu);

		return _possibleConstructorReturn(this, (UserMenu.__proto__ || Object.getPrototypeOf(UserMenu)).apply(this, arguments));
	}

	_createClass(UserMenu, [{
		key: 'renderContent',
		value: function renderContent(user) {
			var avatarProps = {
				className: _menu2.default.user_avatar,
				user: user,
				size: 32,
				circled: true,
				style: {
					margin: 0
				}
			};
			var menuProps = {
				button: {
					content: _react2.default.createElement(
						'span',
						null,
						' ',
						_react2.default.createElement('i', { className: 'fa fa-caret-down' })
					)
				}
			};
			return _react2.default.createElement(
				'span',
				null,
				_react2.default.createElement(_avatar2.default, avatarProps),
				' ',
				user.name || user.login,
				_react2.default.createElement(
					_common.ContextMenu,
					menuProps,
					this.props.children
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;
			var user = props.user;
			return _react2.default.createElement(
				'div',
				{ className: _menu2.default.user_menu },
				user ? this.renderContent(user) : null
			);
		}
	}]);

	return UserMenu;
}(_react.Component);

exports.default = UserMenu;