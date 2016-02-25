import React, { Component } from 'react';
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

	dropdownContent() {
		return (
			<div>{this.props.children}</div>
		);
	}

	render() {
		const { button } = this.props;

		const showDropdown = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ dropdownVisible: true });
			return false;
		};

		const buttonProps = {
			className: button.className,
			onMouseDown: showDropdown,
		};
		const buttonElement = <a {...buttonProps}>{button.content}</a>;

		const dropdownProps = {
			className: styles.context_menu,
			isOpen: this.state.dropdownVisible,
			preferPlace: 'below',
			place: 'below',
			onOuterAction: () => this.setState({ dropdownVisible: false }),
			body: this.props.children,
		};

		return (
			<span>
				{popover(dropdownProps, buttonElement)}
			</span>
		);
	}
}
