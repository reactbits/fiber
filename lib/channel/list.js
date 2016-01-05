'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChannelList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _addchannel = require('./addchannel');

var _addchannel2 = _interopRequireDefault(_addchannel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelList = exports.ChannelList = function ChannelList(props) {
	var selectedId = (props.selectedChannel || {}).id;
	var channels = props.channels.map(function (cn) {
		return _react2.default.createElement(_channel2.default, { key: cn.id, data: cn, selected: cn.id === selectedId, select: props.selectChannel });
	});
	return _react2.default.createElement(
		'div',
		{ className: 'channel-list' },
		_react2.default.createElement(
			'div',
			{ className: 'header' },
			_react2.default.createElement(
				'span',
				null,
				'Channels'
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'channels' },
			channels
		),
		_react2.default.createElement(_addchannel2.default, { createChannel: props.createChannel })
	);
};

exports.default = ChannelList;