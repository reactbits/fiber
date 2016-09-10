'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Age;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isToday(value) {
  if (!_moment2.default.isDate(value)) return false;
  var now = (0, _moment2.default)();
  var m = (0, _moment2.default)(value);
  return m.year() === now.year() && m.dayOfYear() === now.dayOfYear();
}

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

function Age(_ref) {
  var time = _ref.time;

  var text = formatTime(time);
  var className = (0, _classnames2.default)(_style2.default.time, _defineProperty({}, _style2.default.today, isToday(time)));
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
}