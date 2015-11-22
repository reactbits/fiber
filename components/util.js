import _ from 'lodash';

export function isPromise(value) {
	return value && _.isFunction(value.then);
}

export function promiseOnce(fn) {
	let resolved;
	return function() {
		return resolved || (resolved = isPromise(fn) ? fn : new Promise(fn));
	};
}

export function toPromise(value) {
	if (isPromise(value)) {
		return value;
	}
	if (!_.isFunction(value)) {
		return null;
	}
	const p = value();
	return isPromise(p) ? p : null;
}
