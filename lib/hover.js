'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = hover;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _hover = require('hover.css/scss/hover');

var _hover2 = _interopRequireDefault(_hover);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function hover() {
	for (var _len = arguments.length, effects = Array(_len), _key = 0; _key < _len; _key++) {
		effects[_key] = arguments[_key];
	}

	var classList = effects.filter(_lodash2.default.identity).map(function (name) {
		return _hover2.default['hvr-' + name];
	});
	return _classnames2.default.apply(undefined, _toConsumableArray(classList));
}