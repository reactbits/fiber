'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Day = undefined;
exports.TextBlock = TextBlock;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _message = require('../message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO move to common components
function TextBlock(props) {
	return _react2.default.createElement(
		'div',
		{ className: props.className, onClick: props.onClick },
		props.text || ''
	);
}

var formatDay = function formatDay(time) {
	var now = (0, _moment2.default)();
	var day = now.dayOfYear();
	var m = (0, _moment2.default)(time);
	// this year
	if (m.year() === now.year()) {
		if (m.dayOfYear() === day) {
			// TODO localization
			return 'Today';
		}
		if (m.dayOfYear() === day - 1) {
			// TODO localization
			return 'Yesterday';
		}
		// this week
		if (m.week() === now.week()) {
			return m.format('dddd');
		}
		return m.format('MMMM D, dddd');
	}
	return m.format('MMMM D YYYY, dddd');
};

var Day = exports.Day = function Day(props) {
	var className = (0, _classnames2.default)('day', _style2.default.day);
	var text = formatDay(props.time);
	return _react2.default.createElement(
		'div',
		{ className: className },
		_react2.default.createElement(
			'a',
			{ onClick: props.onClick },
			_react2.default.createElement(
				'span',
				null,
				text
			),
			_react2.default.createElement(_message.Counter, { count: props.count })
		)
	);
};

exports.default = Day;