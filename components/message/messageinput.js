import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './style';
import _ from 'lodash';

// TODO render user avatar
// TODO configure submit shortcut, alt-enter is default

export class MessageInput extends Component {
	static propTypes = {
		submit: PropTypes.func,
		cancel: PropTypes.func,
		focused: PropTypes.bool,
	};

	static defaultProps = {
		focused: false,
	};

	componentDidMount() {
		if (!!this.props.focused) {
			$(ReactDOM.findDOMNode(this)).find('.message-input').focus();
		}
	}

	render() {
		const props = this.props;
		const className = classNames('message-input', style.message_input);
		const onKeyUp = (e) => {
			if (e.which === 27) {
				if (_.isFunction(props.cancel)) {
					props.cancel();
					return;
				}
			}
			const input = $(e.target);
			if (e.altKey && e.which === 13) {
				const text = input.val();
				if (!text) return;
				input.val('');
				props.submit(text);
			}
		};
		return (
			<div>
				<textarea className={className} placeholder="Reply..." onKeyUp={onKeyUp}>
				</textarea>
			</div>
		);
	}
}

export default MessageInput;
