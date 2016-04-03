'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.NavItem = NavItem;
exports.IconButton = IconButton;
exports.PlusButton = PlusButton;
exports.NavHeaderButtons = NavHeaderButtons;
exports.NavHeader = NavHeader;
exports.NavBody = NavBody;
exports.NavSection = NavSection;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cssEffects = require('css-effects');

var _navsection = require('./navsection.scss');

var _navsection2 = _interopRequireDefault(_navsection);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function NavItem(props) {
	var selected = props.selected || location.pathname === props.to;
	var className = (0, _classnames2.default)(props.className, _navsection2.default.nav_item, _defineProperty({}, _navsection2.default.nav_item_selected, selected));
	var link = _lodash2.default.isFunction(props.onClick) ? _react2.default.createElement(
		'a',
		{ onClick: props.onClick },
		props.children
	) : _react2.default.createElement(
		_reactRouter.Link,
		{ to: props.to },
		props.children
	);
	return _react2.default.createElement(
		'div',
		{ className: className },
		link
	);
}

function IconButton(props) {
	var className = (0, _classnames2.default)(_navsection2.default.icon_button, (0, _cssEffects.hint)());
	return _react2.default.createElement(
		'span',
		{ className: className, onClick: props.onClick, 'data-hint': props.tip },
		_react2.default.createElement('i', { className: props.iconClass })
	);
}

function PlusButton(props) {
	return _react2.default.createElement(IconButton, _extends({}, props, { iconClass: 'ion-ios-plus-outline' }));
}

function NavHeaderButtons(props) {
	return _react2.default.createElement(
		'span',
		{ className: _navsection2.default.nav_buttons },
		props.children
	);
}

function NavHeader(props) {
	var className = (0, _classnames2.default)(props.className, _navsection2.default.nav_header);
	var title = props.title ? _react2.default.createElement(
		'span',
		{ className: _navsection2.default.nav_title },
		props.title
	) : null;
	return _react2.default.createElement(
		'div',
		{ className: className },
		title,
		props.children
	);
}

function NavBody(props) {
	var className = (0, _classnames2.default)(props.className, _navsection2.default.nav_body);
	return _react2.default.createElement(
		'div',
		{ className: className },
		props.children
	);
}

function NavSection(props) {
	var className = (0, _classnames2.default)(props.className, _navsection2.default.nav_section);
	return _react2.default.createElement(
		'div',
		{ className: className },
		props.children
	);
}

exports.default = NavSection;