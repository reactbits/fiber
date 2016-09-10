import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import style from './style.scss';
import { NavItem } from '../common';

function removeButton(onClick) {
  return <span className={style.btn_remove_channel} onClick={onClick}>&times;</span>;
}

// TODO render channel actions
export default function Channel(props) {
  const canRemove = _.isFunction(props.remove);
  const className = classNames(style.channel, {
    [style.selected_channel]: props.selected,
  });

  const select = () => {
    if (_.isFunction(props.select)) {
      props.select(props.data);
    }
  };

  const itemProps = {
    className,
    onClick: select,
    selected: props.selected,
    to: props.to,
  };

  return (
    <NavItem {...itemProps}>
      <span>{props.data.name}</span>
      <span className="actions">
        {canRemove ? removeButton(props.remove) : null}
      </span>
    </NavItem>
  );
}
