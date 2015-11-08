'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = gravatarURL;

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
	d: 'retro'
};

function isHash(s) {
	return (/^[a-f0-9]{32}$/i.test((s || '').trim().toLowerCase())
	);
}

function queryString(options) {
	var str = _lodash2.default.map(options, function (val, key) {
		return key + '=' + encodeURIComponent(val);
	}).join('&');
	return str.length > 0 ? '?' + str : str;
}

// TODO cash gravatar URLs
function gravatarURL(email) {
	var size = arguments.length <= 1 || arguments[1] === undefined ? 32 : arguments[1];
	var options = arguments.length <= 2 || arguments[2] === undefined ? defaultOptions : arguments[2];

	var url = 'https://secure.gravatar.com/avatar/';

	if (isHash(email)) {
		url += email;
	} else {
		url += (0, _md2.default)(email.toLowerCase());
	}

	url += queryString(Object.assign({ s: size }, options));

	return url;
}