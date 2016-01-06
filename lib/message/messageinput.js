'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageInput = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO render user avatar
// TODO configure submit shortcut, alt-enter is default

var MessageInput = exports.MessageInput = function MessageInput(props) {
	var className = (0, _classnames2.default)('message-input', _style2.default.message_input);
	var onKeyUp = function onKeyUp(e) {
		var input = $(e.target);
		if (e.altKey && e.which === 13) {
			var text = input.val();
			if (!text) return;
			input.val('');
			props.submit(text);
		}
	};
	var inputStyle = {
		width: '100%'
	};
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement('textarea', { className: className, style: inputStyle, placeholder: 'Reply...', onKeyUp: onKeyUp })
	);
};

exports.default = MessageInput;