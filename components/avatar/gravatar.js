import md5 from 'md5';
import _ from 'lodash';
import queryString from 'query-string';

const defaultOptions = {
	d: 'retro',
};

function isHash(s) {
	return /^[a-f0-9]{32}$/i.test((s || '').trim().toLowerCase());
}

// TODO cash gravatar URLs
export default function gravatarURL(email, size = 32, options = defaultOptions) {
	let url = 'https://secure.gravatar.com/avatar/';

	if (isHash(email)) {
		url += email;
	} else {
		url += md5(email.toLowerCase());
	}

	const qs = queryString.stringify(Object.assign({s: size}, options));
	if (qs) {
		url += '?' + qs;
	}

	return url;
}
