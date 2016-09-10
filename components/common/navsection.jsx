import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import { hint } from 'css-effects';
import styles from './navsection.scss';

export function NavItem(props) {
  const selected = props.selected || location.pathname === props.to;
  const className = classNames(props.className, styles.nav_item, {
    [styles.nav_item_selected]: selected,
  });
  const link = props.to
    ? <Link to={props.to}>{props.children}</Link>
    : <a onClick={props.onClick || _.noop}>{props.children}</a>;
  return (
    <div className={className}>{link}</div>
  );
}

export function IconButton(props) {
  const className = classNames(styles.icon_button, hint());
  return (
    <span className={className} onClick={props.onClick} data-hint={props.tip}>
      <i className={props.iconClass} />
    </span>
  );
}

export function PlusButton(props) {
  return <IconButton {...props} iconClass="ion-ios-plus-outline" />;
}

export function NavHeaderButtons(props) {
  return (
    <span className={styles.nav_buttons}>
      {props.children}
    </span>
  );
}

export function NavHeader(props) {
  const className = classNames(props.className, styles.nav_header);
  const title = props.title ? <span className={styles.nav_title}>{props.title}</span> : null;
  return (
    <div className={className}>
      {title}
      {props.children}
    </div>
  );
}

export function NavBody(props) {
  const className = classNames(props.className, styles.nav_body);
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export function NavSection(props) {
  const className = classNames(props.className, styles.nav_section);
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
