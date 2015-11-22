'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isPromise = isPromise;
exports.promiseOnce = promiseOnce;
exports.toPromise = toPromise;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(value) {
	return value && _lodash2.default.isFunction(value.then);
}

function promiseOnce(fn) {
	var resolved = undefined;
	return function () {
		return resolved || (resolved = isPromise(fn) ? fn : new Promise(fn));
	};
}

function toPromise(value) {
	if (isPromise(value)) {
		return value;
	}
	if (!_lodash2.default.isFunction(value)) {
		return null;
	}
	var p = value();
	return isPromise(p) ? p : null;
}