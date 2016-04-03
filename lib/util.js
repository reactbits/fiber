'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isPromise = isPromise;
exports.promiseOnce = promiseOnce;
exports.toPromise = toPromise;
exports.firstOrDefault = firstOrDefault;
exports.getOrFetch = getOrFetch;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(value) {
	return value && _lodash2.default.isFunction(value.then);
}

function promiseOnce(fn, data) {
	if (!fn) return fn;
	var resolved = void 0;
	return function () {
		if (resolved) return resolved;
		if (isPromise(fn)) {
			return resolved = fn;
		}
		var t = fn(data);
		resolved = isPromise(t) ? t : Promise.resolve(t);
		return resolved;
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

function firstOrDefault(obj) {
	if (!obj) return null;

	for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		keys[_key - 1] = arguments[_key];
	}

	for (var i = 0; i < keys.length; i++) {
		var val = obj[keys[i]];
		if (val) return val;
	}
	return null;
}

function getOrFetch(fetch, obj) {
	for (var _len2 = arguments.length, keys = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		keys[_key2 - 2] = arguments[_key2];
	}

	var val = firstOrDefault.apply(undefined, [obj].concat(keys));
	if (val) return val;
	var promise = toPromise(fetch);
	if (promise) {
		return promise.then(function (t) {
			return firstOrDefault.apply(undefined, [t].concat(keys));
		});
	}
	return null;
}