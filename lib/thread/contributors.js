'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ContributorList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContributorList = exports.ContributorList = (function (_Component) {
	_inherits(ContributorList, _Component);

	function ContributorList(props) {
		_classCallCheck(this, ContributorList);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContributorList).call(this, props));

		var users = props.users;

		_this.state = {
			users: _lodash2.default.isFunction(users) ? users() : users
		};
		return _this;
	}

	_createClass(ContributorList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var users = this.props.users;

			if (_lodash2.default.isFunction(users)) {
				setTimeout(function () {
					_this2.setState({ users: users() });
				}, 0);
				this.unsubscribe = users(function (list) {
					_this2.setState({ users: list });
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (_lodash2.default.isFunction(this.unsubscribe)) {
				this.unsubscribe();
				this.unsubscribe = null;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var users = this.props.users;

			if (_lodash2.default.isFunction(users)) {
				setTimeout(function () {
					_this3.setState({ users: users() });
				}, 0);
			}
			var items = this.state.users.map(function (user) {
				var avatarProps = {
					hover: 'grow',
					user: user,
					shape: 'round_rect',
					online: false,
					size: 24,
					style: {
						display: 'inline-block',
						margin: '0px'
					}
				};
				return _react2.default.createElement(_avatar2.default, _extends({ key: user.id }, avatarProps));
			});
			return _react2.default.createElement(
				'div',
				{ className: _style2.default.contributor_list },
				items
			);
		}
	}]);

	return ContributorList;
})(_react.Component);

exports.default = ContributorList;