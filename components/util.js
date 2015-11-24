import _ from 'lodash';

export function isPromise(value) {
	return value && _.isFunction(value.then);
}

export function promiseOnce(fn, data) {
	if (!fn) return fn;
	let resolved;
	return function() {
		if (resolved) return resolved;
		if (isPromise(fn)) {
			return (resolved = fn);
		}
		const t = fn(data);
		resolved = isPromise(t) ? t : Promise.resolve(t);
		return resolved;
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

export function firstOrDefault(obj, ...keys) {
	if (!obj) return null;
	for (let i = 0; i < keys.length; i++) {
		const val = obj[keys[i]];
		if (val) return val;
	}
	return null;
}

export function getOrFetch(fetch, obj, ...keys) {
	const val = firstOrDefault(obj, ...keys);
	if (val) return val;
	const promise = toPromise(fetch);
	if (promise) {
		return promise.then(t => {
			return firstOrDefault(t, ...keys);
		});
	}
	return null;
}
