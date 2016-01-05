import React from 'react';
import style from './style';
import moment from 'moment';

// TODO move to common components
export const TextBlock = (props) => {
	return (
		<div className={props.className} onClick={props.onClick}>
			{props.text || ''}
		</div>
	);
};

const formatDay = (time) => {
	const now = moment();
	const day = now.dayOfYear();
	const m = moment(time);
	// this year
	if (m.year() === now.year()) {
		if (m.dayOfYear() === day) {
			// TODO localization
			return 'Today';
		}
		if (m.dayOfYear() === day - 1) {
			// TODO localization
			return 'Yesterday';
		}
		// this week
		if (m.week() === now.week()) {
			return m.format('dddd');
		}
		return m.format('MMMM D, dddd');
	}
	return m.format('MMMM D YYYY, dddd');
};

export const Day = (props) => {
	const text = formatDay(props.time);
	const msgCount = n => {
		return (
			<span style={{ margin: '0 4px 0 4px' }}>
				<i className="ion-ios-chatbubble" style={{ marginRight: '4px' }}/>
				<span>{n}</span>
			</span>
		);
	};
	return (
		<div className={'day ' + style.day}>
			<a onClick={props.onClick}>
				<span>{text}</span>
				{props.count > 0 ? msgCount(props.count) : null}
			</a>
		</div>
	);
};

export default Day;
