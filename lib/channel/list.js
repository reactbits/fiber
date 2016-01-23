'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChannelList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _addchannel = require('./addchannel');

var _addchannel2 = _interopRequireDefault(_addchannel);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChannelList = exports.ChannelList = function ChannelList(props) {
	var className = (0, _classnames2.default)(_defineProperty({
		'channel-list': true
	}, _style2.default.channel_list, true));
	var selectedId = (props.selectedChannel || {}).id;
	var channels = props.channels.map(function (cn) {
		var cnprops = {
			key: cn.id,
			data: cn,
			selected: cn.id === selectedId,
			select: props.selectChannel
		};
		return _react2.default.createElement(_channel2.default, cnprops);
	});
	return _react2.default.createElement(
		'div',
		{ className: className },
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
			{ className: 'body' },
			channels
		),
		_react2.default.createElement(_addchannel2.default, { createChannel: props.createChannel })
	);
};

exports.default = ChannelList;