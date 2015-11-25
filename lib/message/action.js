'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Action = exports.actionTip = exports.actionIcon = undefined;
exports.renderActions = renderActions;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO configurable icons
var actionIcon = exports.actionIcon = {
	like: 'fa fa-heart',
	reply: 'fa fa-comment',
	star: 'fa fa-star',
	remove: 'fa fa-trash'
};

var actionTip = exports.actionTip = {
	like: 'Like',
	reply: 'Reply',
	star: 'Star',
	remove: 'Delete'
};

var Action = exports.Action = function Action(props) {
	var className = 'action ' + props.type;
	if (props.right) className += ' pull-right';

	var count = props.count || 0;

	var onClick = function onClick(e) {
		e.preventDefault();
		if (_lodash2.default.isFunction(props.onAction)) {
			props.onAction(props.type, props.msgid);
		}
	};

	return _react2.default.createElement(
		'a',
		{ className: className, onClick: onClick, 'data-toggle': 'tooltip', title: actionTip[props.type] },
		_react2.default.createElement('i', { className: actionIcon[props.type] }),
		count > 0 ? _react2.default.createElement(
			'span',
			{ className: 'count' },
			count
		) : null
	);
};

exports.default = Action;
function renderActions(actions, msg, handler) {
	return Object.keys(actions).map(function (key) {
		var props = _extends({
			msgid: msg.id,
			type: key
		}, actions[key], {
			onAction: handler
		});
		props.type = key;
		return _react2.default.createElement(Action, _extends({ key: msg.id + '/' + key }, props));
	});
}