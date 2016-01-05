'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AddChannel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddChannel = exports.AddChannel = function AddChannel(props) {
	var add = function add(input) {
		var value = input.val();
		input.val('');
		if (value) {
			props.createChannel({ name: value });
		}
	};
	var onKeyDown = function onKeyDown(e) {
		if (e.which === 13) {
			add($(e.target));
		}
	};
	var onAddClick = function onAddClick(e) {
		add($(e.target).parent().find('.channel-name-input'));
	};
	var btnClassName = (0, _classnames2.default)('ion-plus-circled', _style2.default.btn_add_channel);
	return _react2.default.createElement(
		'div',
		{ className: 'add-channel-container' },
		_react2.default.createElement('input', { type: 'text', className: 'channel-name-input', onKeyDown: onKeyDown }),
		_react2.default.createElement('i', { className: btnClassName, title: 'Add channel', onClick: onAddClick })
	);
};

exports.default = AddChannel;