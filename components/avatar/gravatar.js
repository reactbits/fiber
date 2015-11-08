import md5 from 'md5';
import _ from 'lodash';

const defaultOptions = {
	d: 'retro',
};

function isHash(s) {
	return /^[a-f0-9]{32}$/i.test((s || '').trim().toLowerCase());
}

function queryString(options) {
	const str = _.map(options, (val, key) => key + '=' + encodeURIComponent(val)).join('&');
	return str.length > 0 ? '?' + str : str;
}

// TODO cash gravatar URLs
export default function gravatarURL(email, size = 32, options = defaultOptions) {
	let url = 'https://secure.gravatar.com/avatar/';

	if (isHash(email)) {
		url += email;
	} else {
		url += md5(email.toLowerCase());
	}

	url += queryString(Object.assign({s: size}, options));

	return url;
}
