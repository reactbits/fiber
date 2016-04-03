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

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChannelList = exports.ChannelList = function ChannelList(props) {
	var className = (0, _classnames2.default)(props.className, _style2.default.channel_list);
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
		_common.NavSection,
		{ className: className },
		_react2.default.createElement(
			_common.NavHeader,
			{ title: 'CHANNELS' },
			_react2.default.createElement(
				_common.NavHeaderButtons,
				null,
				_react2.default.createElement(_common.PlusButton, { tip: 'Create new channel' })
			)
		),
		_react2.default.createElement(
			_common.NavBody,
			null,
			channels
		),
		_react2.default.createElement(_addchannel2.default, { createChannel: props.createChannel })
	);
};

exports.default = ChannelList;