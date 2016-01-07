'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Action = exports.tips = exports.faIconSet = exports.ionIconSet = undefined;
exports.renderActions = renderActions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _messagecount = require('./messagecount');

var _messagecount2 = _interopRequireDefault(_messagecount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO configurable icons
var ionIconSet = exports.ionIconSet = {
	like: 'ion-ios-heart',
	reply: 'ion-ios-chatbubble',
	star: 'ion-star',
	remove: 'ion-trash-a'
};

var faIconSet = exports.faIconSet = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash'
};

var tips = exports.tips = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete'
};

function getIconSet(name) {
	switch (name) {
		case 'fa':
		case 'awesome':
			return faIconSet;
		case 'ion':
		case 'ionic':
		default:
			return ionIconSet;
	}
}

var Action = exports.Action = function Action(props) {
	var _classNames;

	var count = props.count || 0;
	var onClick = function onClick(e) {
		e.preventDefault();
		if (_lodash2.default.isFunction(props.onAction)) {
			props.onAction(props.type, props.msgid);
		}
	};

	if (props.type === 'reply') {
		var attrs = {
			count: count,
			onClick: onClick,
			title: tips[props.type],
			element: _react2.default.DOM.a
		};
		return _react2.default.createElement(_messagecount2.default, attrs);
	}

	var className = (0, _classnames2.default)((_classNames = {
		action: true
	}, _defineProperty(_classNames, props.type, true), _defineProperty(_classNames, _style2.default.action, true), _defineProperty(_classNames, 'pull-right', props.right), _classNames));
	var iconSet = getIconSet(props.iconSet);

	return _react2.default.createElement(
		'a',
		{ className: className, onClick: onClick, 'data-toggle': 'tooltip', title: tips[props.type] },
		_react2.default.createElement('i', { className: iconSet[props.type] }),
		count > 0 ? _react2.default.createElement(
			'span',
			{ className: 'count' },
			count
		) : null
	);
};

exports.default = Action;
function renderActions(actions, msg, options) {
	return Object.keys(actions).map(function (key) {
		var props = _extends({
			msgid: msg.id,
			type: key,
			onAction: options.onAction,
			iconSet: options.iconSet
		}, actions[key]);
		props.type = key;
		return _react2.default.createElement(Action, _extends({ key: msg.id + '/' + key }, props));
	});
}