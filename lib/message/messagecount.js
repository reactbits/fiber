'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageCount = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageCount = exports.MessageCount = function MessageCount(props) {
	var className = (0, _classnames2.default)('message-count', _style2.default.message_count);
	var elem = props.element || _react2.default.DOM.span;
	var attrs = { className: className, onClick: props.onClick };
	if (props.title) {
		attrs = _extends({}, attrs, {
			'data-toggle': 'tooltip',
			title: props.title
		});
	}
	return elem(attrs, props.count);
};

exports.default = MessageCount;