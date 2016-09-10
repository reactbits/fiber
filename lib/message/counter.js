'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Counter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cssEffects = require('css-effects');

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Counter(props) {
  var className = props.className || _style2.default.message_count;
  var attrs = { className: className, onClick: props.onClick };
  var counter = _react2.default.createElement(
    'span',
    attrs,
    props.count
  );
  if (props.title) {
    return _react2.default.createElement(
      'span',
      { className: (0, _cssEffects.hint)(), 'data-hint': props.title },
      counter
    );
  }
  return counter;
}