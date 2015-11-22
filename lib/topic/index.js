'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TopicList = exports.Topic = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Topic = function Topic(props) {
	// TODO render title, short message, time, badges e.g. number of unread messages
	var user = props.user;
	return _react2.default.createElement(
		'div',
		{ className: 'topic ' + _style2.default.topic },
		user && user.avatar ? _react2.default.createElement(_avatar2.default, { source: user.avatar, size: props.avatarSize, name: user.name }) : null
	);
};

var TopicList = function TopicList(props) {
	var items = props.items.map(function (t) {
		return _react2.default.createElement(Topic, t);
	});
	return _react2.default.createElement(
		'div',
		{ className: 'topic_list ' + _style2.default.topic_list },
		items
	);
};

exports.default = Topic;
exports.Topic = Topic;
exports.TopicList = TopicList;