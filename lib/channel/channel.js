'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Channel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO render channel actions
var Channel = exports.Channel = function Channel(props) {
	var className = (0, _classnames2.default)(_style2.default.channel, _defineProperty({}, _style2.default.selected_channel, props.selected));
	var select = function select() {
		if (_lodash2.default.isFunction(props.select)) {
			props.select(props.data);
		}
	};
	return _react2.default.createElement(
		_common.NavItem,
		{ className: className, onClick: select, selected: props.selected },
		props.data.name
	);
};

exports.default = Channel;