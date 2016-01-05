'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTime = exports.MessageInput = exports.Message = undefined;

var _message = require('./message');

var _messageinput = require('./messageinput');

var _messageinput2 = _interopRequireDefault(_messageinput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Message = _message.Message;
exports.MessageInput = _messageinput2.default;
exports.getTime = _message.getTime;
exports.default = _message.Message;