'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMsgDay = undefined;
exports.getDay = getDay;
exports.getDayMessages = getDayMessages;
exports.countMessages = countMessages;
exports.collectContributors = collectContributors;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _message = require('../message');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getDay(time) {
	var m = (0, _moment2.default)(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
}

var getMsgDay = exports.getMsgDay = function getMsgDay(msg) {
	return getDay((0, _message.getTime)(msg));
};

function getDayMessages(messages, start) {
	var msg = messages[start];
	var result = [msg];
	var day = getMsgDay(msg);
	for (var i = start + 1; i < messages.length; i += 1) {
		if (day !== getMsgDay(messages[i])) {
			i -= 1;
			break;
		}
		result.push(messages[i]);
	}
	return result;
}

function countMessages(messages) {
	var countIt = function countIt(m) {
		var n = 1;
		if (Array.isArray(m.replies)) {
			n += m.replies.reduce(function (a, b) {
				return a + countIt(b);
			}, 0);
		}
		return n;
	};
	return messages.reduce(function (a, m) {
		return a + countIt(m);
	}, 0);
}

function collectContributors(users, messages, fetchUser) {
	function push(user) {
		var arr = users();
		if (_lodash2.default.find(arr, function (u) {
			return u.id === user.id;
		})) return;
		users([].concat(_toConsumableArray(arr), [user]));
	}
	messages.forEach(function (m) {
		if (_lodash2.default.isObject(m.user)) {
			push(m.user);
		} else if (m.fetchUser || fetchUser) {
			var promise = (0, _util.toPromise)((0, _util.promiseOnce)(m.fetchUser || fetchUser, m));
			if (promise) {
				promise.then(push);
			}
		}
		if (_lodash2.default.isArray(m.replies)) {
			collectContributors(users, m.replies, fetchUser);
		}
	});
}