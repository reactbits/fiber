import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import style from './style';
import _ from 'lodash';

const isToday = (value) => {
	if (!moment.isDate(value)) return false;
	const now = moment();
	const m = moment(value);
	return m.year() === now.year() && m.dayOfYear() === now.dayOfYear();
};

const formatTime = (value) => {
	if (!value) {
		return '';
	}
	if (_.isString(value)) {
		return value;
	}
	if (isToday(value)) {
		return moment(value).fromNow();
	}
	return moment(value).format('HH:mm');
};

export const Age = ({ time }) => {
	const text = formatTime(time);
	const className = classNames({
		time: true,
		[style.time]: true,
		[style.today]: isToday(time),
	});
	const attrs = {
		className,
	};

	if (moment.isDate(time)) {
		attrs['data-toggle'] = 'tooltip';
		attrs.title = moment(time).format('ddd MMM D YYYY HH:mm:ss');
	}

	return (
		<span {...attrs}>{text}</span>
	);
};

export default Age;
