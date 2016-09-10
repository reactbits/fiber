import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Avatar from '../avatar';
import Thread from './thread';
import style from './style.scss';

function formatTime(value) {
  return value ? moment(value).format('HH:mm') : '';
}

// TODO reuse rendering of user name from message component

export const Topic = (props) => {
  const className = classNames(style.topic, {
    [style.topic_selected]: !!props.selected,
  });
  const msg = props.last_message || props.message || {};
  const user = msg.user;
  const unread = props.unread ? `${props.unread > 10 ? '10+' : props.unread} new` : '';
  const avatarURL = user ? user.avatar_url || user.avatar : null;

  const onClick = (e) => {
    e.preventDefault();
    if (_.isFunction(props.onSelect)) {
      props.onSelect(props.thread);
    }
  };

  return (
    <div className={className} onClick={onClick}>
      {avatarURL ? <Avatar source={avatarURL} size={props.avatarSize} name={user.name} /> : null}
      <div className={`header ${style.header}`}>
        <span>{props.topic}</span>
        {unread ? <span className={`unread ${style.unread}`}>{unread}</span> : null}
      </div>
      <div className={`body ${style.body}`}>{msg.body}</div>
      <div>
        {user && user.name ? <span className={style.user_name}>{user.name}</span> : null}
        <span className={style.time}>{` at ${formatTime(props.updated_at)}`}</span>
      </div>
    </div>
  );
};

// TODO render only topic in collapsed mode

const threadPropNames = [
  'avatarSize',
  'iconSet',
  'fetchUser',
  'sendMessage',
  'updateMessage',
  'onSelect',
  'onAction',
  'canExecute',
  'theme',
];

export default function ThreadList(props) {
  const className = classNames(style.thread_list);
  // TODO use propTypes of Thread component
  const options = _.pick(props, ...threadPropNames);
  const items = props.threads.map(t =>
    <Thread key={t.id} {...t} {...options} />
    // <Topic key={t.id} thread={t} {...t} onSelect={props.onSelect}/>
  );
  return (
    <div className={className}>
      {items}
    </div>
  );
}

ThreadList.defaultProps = {
  theme: 'plain',
};
