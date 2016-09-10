import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import style from './style.scss';
import { Counter } from '../message';

// TODO move to common components
export function TextBlock(props) {
  return (
    <div className={props.className} onClick={props.onClick}>
      {props.text || ''}
    </div>
  );
}

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

export default function Day(props) {
  const className = classNames(style.day);
  const text = formatDay(props.time);
  return (
    <div className={className}>
      <a onClick={props.onClick}>
        <span>{text}</span>
        <Counter count={props.count} />
      </a>
    </div>
  );
}
