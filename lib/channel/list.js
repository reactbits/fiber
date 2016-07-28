'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChannelList = ChannelList;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _addchannel = require('./addchannel');

var _addchannel2 = _interopRequireDefault(_addchannel);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ChannelList(props) {
	var className = (0, _classnames2.default)(props.className, _style2.default.channel_list);
	var selectedId = (props.selectedChannel || {}).id;
	var channels = props.channels.map(function (cn, i) {
		var cnprops = {
			key: cn.id || i,
			data: cn,
			selected: cn.id === selectedId,
			select: props.selectChannel,
			remove: _lodash2.default.isFunction(props.removeChannel) ? props.removeChannel.bind(null, cn) : undefined,
			to: cn.id && props.basePath ? props.basePath + '/' + cn.id : undefined
		};
		return _react2.default.createElement(_channel2.default, cnprops);
	});
	var onPlusClick = function onPlusClick() {
		(0, _addchannel2.default)(props.createChannel);
	};
	return _react2.default.createElement(
		_common.NavSection,
		{ className: className },
		_react2.default.createElement(
			_common.NavHeader,
			{ title: 'CHANNELS' },
			_react2.default.createElement(
				_common.NavHeaderButtons,
				null,
				_react2.default.createElement(_common.PlusButton, { tip: 'Create new channel', onClick: onPlusClick })
			)
		),
		_react2.default.createElement(
			_common.NavBody,
			null,
			channels
		)
	);
}

exports.default = ChannelList;