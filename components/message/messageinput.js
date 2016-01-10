import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import Help from '../markdown/help';
import style from './style';
import _ from 'lodash';

// TODO render user avatar
// TODO configure submit shortcut, ctrl-enter is default

export class MessageInput extends Component {
	static propTypes = {
		submit: PropTypes.func,
		cancel: PropTypes.func,
		focused: PropTypes.bool,
	};

	static defaultProps = {
		focused: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			value: props.value || '',
			helpVisible: false,
		};
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		const input = $(this.refs.input);
		input.focus(this.onFocus).blur(this.onBlur);
		if (!!this.props.focused) {
			input.focus();
		}
	}

	componentWillUnmount() {
		const input = $(this.refs.input);
		input.off('focus').off('blur');
	}

	onFocus() {
		$(ReactDOM.findDOMNode(this)).addClass(style.focused);
	}

	onBlur() {
		$(ReactDOM.findDOMNode(this)).removeClass(style.focused);
	}

	onChange(event) {
		const value = event.target.value || '';
		if (_.isFunction(this.props.onChange)) {
			this.props.onChange(value);
		}
		this.setState({ value });
	}

	render() {
		const props = this.props;
		const className = classNames('message-input', style.input, style.message_input);
		const canSubmit = _.isFunction(props.canSubmit) ?
												props.canSubmit
												: () => this.state.value.length > 0;
		const submit = () => {
			const input = $(this.refs.input);
			const text = input.val();
			if (!text) return;
			this.setState({ value: '' });
			props.submit(text);
		};
		const onKeyUp = (e) => {
			if (e.which === 27) {
				if (_.isFunction(props.cancel)) {
					props.cancel();
					return;
				}
			}
			if (e.ctrlKey && e.which === 13) {
				submit();
			}
		};
		const textareaProps = {
			className,
			placeholder: props.placeholder || 'Reply...',
			value: this.state.value,
			onKeyUp,
			onChange: this.onChange,
		};
		const submitProps = {
			className: 'pull-right',
			bsStyle: 'primary',
			bsSize: 'small',
			onClick: submit,
			disabled: !canSubmit(),
		};
		return (
			<div className={style.reply_form}>
				<Help/>
				<textarea ref="input" {...textareaProps}/>
				<div className={style.reply_controls}>
					<a className={style.upload_button} data-toggle="tooltip" title="Upload images">
						<i className="ion-camera"/>
					</a>
					<Button {...submitProps}>Post</Button>
				</div>
			</div>
		);
	}
}

export default MessageInput;
