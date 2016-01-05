'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Day = exports.TextBlock = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO move to common components
var TextBlock = exports.TextBlock = function TextBlock(props) {
	return _react2.default.createElement(
		'div',
		{ className: props.className, onClick: props.onClick },
		props.text || ''
	);
};

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
	var text = formatDay(props.time);
	var msgCount = function msgCount(n) {
		return _react2.default.createElement(
			'span',
			{ style: { margin: '0 4px 0 4px' } },
			_react2.default.createElement('i', { className: 'ion-ios-chatbubble', style: { marginRight: '4px' } }),
			_react2.default.createElement(
				'span',
				null,
				n
			)
		);
	};
	return _react2.default.createElement(
		'div',
		{ className: 'day ' + _style2.default.day },
		_react2.default.createElement(
			'a',
			{ onClick: props.onClick },
			_react2.default.createElement(
				'span',
				null,
				text
			),
			props.count > 0 ? msgCount(props.count) : null
		)
	);
};

exports.default = Day;