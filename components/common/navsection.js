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
	return (
		<div className={className}>
			<Link to={props.to}>{props.children}</Link>
		</div>
	);
}

export function IconButton(props) {
	const className = classNames(styles.icon_button, hint());
	return (
		<div className={className} onClick={props.onClick} data-hint={props.tip}>
			<i className={props.iconClass} />
		</div>
	);
}

export function PlusButton(props) {
	return <IconButton {...props} iconClass="ion-ios-plus-outline" />;
}

export function NavHeaderButtons(props) {
	return (
		<div className={styles.nav_buttons}>
			{props.children}
		</div>
	);
}

export function NavHeader(props) {
	const className = classNames(props.className, styles.nav_header);
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

export default NavSection;
