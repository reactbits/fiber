'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = gravatarURL;

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
	d: 'retro'
};

function isHash(s) {
	return (/^[a-f0-9]{32}$/i.test((s || '').trim().toLowerCase())
	);
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

	var qs = _queryString2.default.stringify(_extends({ s: size }, options));
	if (qs) {
		url += '?' + qs;
	}

	return url;
}