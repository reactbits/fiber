'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Age = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isToday = function isToday(value) {
	if (!_moment2.default.isDate(value)) return false;
	var now = (0, _moment2.default)();
	var m = (0, _moment2.default)(value);
	return m.year() === now.year() && m.dayOfYear() === now.dayOfYear();
};

var formatTime = function formatTime(value) {
	if (!value) {
		return '';
	}
	if (_lodash2.default.isString(value)) {
		return value;
	}
	if (isToday(value)) {
		return (0, _moment2.default)(value).fromNow();
	}
	return (0, _moment2.default)(value).format('HH:mm');
};

var Age = exports.Age = function Age(_ref) {
	var time = _ref.time;

	var text = formatTime(time);

	var className = 'time ' + _style2.default.time;
	if (isToday(time)) {
		className += ' ' + _style2.default.today;
	}

	var attrs = {
		className: className
	};

	if (_moment2.default.isDate(time)) {
		attrs['data-toggle'] = 'tooltip';
		attrs.title = (0, _moment2.default)(time).format('ddd MMM D YYYY HH:mm:ss');
	}

	return _react2.default.createElement(
		'span',
		attrs,
		text
	);
};

exports.default = Age;