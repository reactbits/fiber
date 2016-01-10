'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Input = Input;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Input(props) {
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
	return _react2.default.createElement('textarea', attrs);
}

exports.default = Input;