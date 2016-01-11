'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Input = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = exports.Input = (function (_Component) {
	_inherits(Input, _Component);

	function Input() {
		_classCallCheck(this, Input);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
	}

	_createClass(Input, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.focused) {
				$(this.refs.input).focus();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;
			var onKeyUp = function onKeyUp(e) {
				if (e.which === 27) {
					var input = $(e.target);
					input.blur();
					if (_lodash2.default.isFunction(props.cancel)) {
						props.cancel();
						return;
					}
					return;
				}
				if (e.ctrlKey && e.which === 13 && _lodash2.default.isFunction(props.submit)) {
					props.submit();
				}
			};
			var onMouseDown = function onMouseDown(e) {
				var input = $(e.target);
				input.focus();
			};
			var attrs = _extends({
				className: props.className || _style2.default.input,
				type: 'text',
				onKeyUp: onKeyUp,
				onMouseDown: onMouseDown
			}, props);
			return _react2.default.createElement('textarea', _extends({ ref: 'input' }, attrs));
		}
	}]);

	return Input;
})(_react.Component);

exports.default = Input;