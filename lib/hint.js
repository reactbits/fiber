'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = hint;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hint = require('hint.css/hint.css');

var _hint2 = _interopRequireDefault(_hint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hint() {
	for (var _len = arguments.length, modifiers = Array(_len), _key = 0; _key < _len; _key++) {
		modifiers[_key] = arguments[_key];
	}

	if (modifiers.length === 0) {
		return (0, _classnames2.default)(_hint2.default['hint--top'], _hint2.default['hint--rounded']);
	}
	return (0, _classnames2.default)(modifiers.map(function (k) {
		return _hint2.default['hint--' + k];
	}));
}