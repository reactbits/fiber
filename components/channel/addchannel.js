import React from 'react';
import classNames from 'classnames';
import style from './style';

export const AddChannel = (props) => {
	const add = (input) => {
		const value = input.val();
		input.val('');
		if (value) {
			props.createChannel({ name: value });
		}
	};
	const onKeyDown = (e) => {
		if (e.which === 13) {
			add($(e.target));
		}
	};
	const onAddClick = (e) => {
		add($(e.target).parent().find('.channel-name-input'));
	};
	const btnClassName = classNames('ion-plus-circled', style.btn_add_channel);
	return (
		<div className="add-channel-container">
			<input type="text" className="channel-name-input" onKeyDown={onKeyDown} />
			<i className={btnClassName} title="Add channel" onClick={onAddClick}></i>
		</div>
	);
};

export default AddChannel;
