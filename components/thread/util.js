import moment from 'moment';
import _ from 'lodash';
import { getTime } from '../message';
import { toPromise, promiseOnce } from '../util';

export function getDay(time) {
	const m = moment(time);
	return m.isValid ? m.year() + m.dayOfYear() : -1;
}

export const getMsgDay = msg => getDay(getTime(msg));

export function getDayMessages(messages, start) {
	const msg = messages[start];
	const result = [msg];
	const day = getMsgDay(msg);
	for (let i = start + 1; i < messages.length; i++) {
		if (day !== getMsgDay(messages[i])) {
			i--;
			break;
		}
		result.push(messages[i]);
	}
	return result;
}

export function countMessages(messages) {
	const countIt = m => {
		let n = 1;
		if (Array.isArray(m.replies)) {
			n += m.replies.reduce((a, b) => a + countIt(b), 0);
		}
		return n;
	};
	return messages.reduce((a, m) => a + countIt(m), 0);
}

export function collectContributors(users, messages, fetchUser) {
	function push(user) {
		const arr = users();
		if (_.find(arr, u => u.id === user.id)) return;
		users([...arr, user]);
	}
	messages.forEach(m => {
		if (_.isObject(m.user)) {
			push(m.user);
		} else if (m.fetchUser || fetchUser) {
			const promise = toPromise(promiseOnce(m.fetchUser || fetchUser, m));
			if (promise) {
				promise.then(push);
			}
		}
		if (_.isArray(m.replies)) {
			collectContributors(users, m.replies, fetchUser);
		}
	});
}
