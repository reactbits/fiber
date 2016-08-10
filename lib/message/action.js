'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.tips = exports.faIconSet = exports.ionIconSet = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Action = Action;
exports.renderActions = renderActions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cssEffects = require('css-effects');

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO configurable icons
var ionIconSet = exports.ionIconSet = {
	like: 'ion-ios-heart',
	reply: 'ion-ios-chatbubble',
	star: 'ion-star',
	remove: 'ion-trash-a',
	edit: 'ion-edit'
};

var faIconSet = exports.faIconSet = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash',
	edit: 'fa fa-pencil'
};

var tips = exports.tips = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete',
	edit: 'Edit'
};

var actionClassNames = {
	like: _style2.default.like_count,
	reply: _style2.default.message_count
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

function Action(props) {
	var _classNames;

	var action = props.action;

	var count = props.count || 0;
	var onClick = function onClick(e) {
		e.preventDefault();
		if (_lodash2.default.isFunction(props.onAction)) {
			props.onAction(props.type, action, props.data);
		}
	};

	if (action === 'reply') {
		var attrs = {
			className: actionClassNames[action],
			count: count,
			onClick: onClick,
			title: tips[action],
			element: _react2.default.DOM.a
		};
		return _react2.default.createElement(_counter2.default, attrs);
	}

	var className = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, (0, _cssEffects.hint)(), true), _defineProperty(_classNames, action, true), _defineProperty(_classNames, _style2.default.action, true), _defineProperty(_classNames, 'pull-right', props.right), _classNames));
	var iconSet = getIconSet(props.iconSet);

	return _react2.default.createElement(
		'a',
		{ className: className, onClick: onClick, 'data-hint': tips[action] },
		_react2.default.createElement('i', { className: iconSet[action] }),
		count > 0 ? _react2.default.createElement(
			'span',
			{ className: 'count' },
			count
		) : null
	);
}

exports.default = Action;
function renderActions(actions, type, data, options) {
	return Object.keys(actions).filter(function (key) {
		if (!_lodash2.default.isFunction(options.canExecute)) return true;
		return options.canExecute(type, key, data);
	}).map(function (key) {
		var props = _extends({
			data: data,
			type: type,
			action: key,
			onAction: options.onAction,
			iconSet: options.iconSet
		}, actions[key]);
		return _react2.default.createElement(Action, _extends({ key: data.id + '/' + key }, props));
	});
}