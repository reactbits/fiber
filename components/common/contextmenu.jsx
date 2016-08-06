import React, { Component } from 'react';
import classNames from 'classnames';
import PopoverClass from 'react-popover';
import styles from './contextmenu.scss';

const popover = React.createFactory(PopoverClass);

export default class ContextMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownVisible: false,
		};
	}

	render() {
		const { button } = this.props;

		const hide = () => this.setState({ dropdownVisible: false });
		const showDropdown = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ dropdownVisible: true });
			return false;
		};

		const buttonProps = {
			className: classNames(styles.show_button, button.className),
			onMouseDown: showDropdown,
		};
		const buttonElement = <a {...buttonProps}>{button.content}</a>;

		const dropdownProps = {
			className: styles.context_menu,
			isOpen: this.state.dropdownVisible,
			preferPlace: 'below',
			place: 'below',
			onOuterAction: hide,
			body: <ul className={styles.menu_items} onClick={hide}>{this.props.children}</ul>,
			refreshIntervalMs: false,
		};

		return (
			<span>
				{popover(dropdownProps, buttonElement)}
			</span>
		);
	}
}
