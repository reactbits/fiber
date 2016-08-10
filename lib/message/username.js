'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserName = function (_Component) {
	_inherits(UserName, _Component);

	function UserName(props) {
		_classCallCheck(this, UserName);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserName).call(this, props));

		_this.state = { name: props.name };
		_this.setName = _this.setName.bind(_this);
		return _this;
	}

	_createClass(UserName, [{
		key: 'setName',
		value: function setName(value) {
			return this.setState({ name: value });
		}
	}, {
		key: 'render',
		value: function render() {
			var value = this.state.name;
			if (!value) {
				return _react2.default.createElement('span', null);
			}
			if (!_lodash2.default.isString(value)) {
				var promise = (0, _util.toPromise)(value);
				if (promise) {
					promise.then(this.setName);
				}
				// TODO render small spinner
				value = '';
			}
			return _react2.default.createElement(
				'a',
				{ className: (0, _classnames2.default)(_style2.default.name) },
				value
			);
		}
	}]);

	return UserName;
}(_react.Component);

exports.default = UserName;