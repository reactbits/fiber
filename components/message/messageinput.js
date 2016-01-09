import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PopoverClass from 'react-popover';
import style from './style';
import _ from 'lodash';

const popover = React.createFactory(PopoverClass);

function helpContent() {
	const quote = '> ';
	const monospaced = '`';
	return (
		<div>
			<div className={style.help_format}>
				<span><b>*bold*</b></span><br/>
				<span><i>_italic_</i></span><br/>
				<span>{quote}{'quoted'}</span><br/>
				<span className={style.monospaced}>{monospaced}{'monospaced'}{monospaced}</span><br/>
				<span>[title](link)</span><br/>
			</div>
			<div className={style.help_code}>
				<span>{'```js'}</span><br/>
				<span>javascript code</span><br/>
				<span>{'```'}</span><br/>
			</div>
			<div className={style.help_post}>
				<em>ctrl</em>
				{' + '}
				<em>enter</em>
				<span>&nbsp;post</span>
			</div>
		</div>
	);
}

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
			value: props.value,
			helpVisible: false,
		};
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		const input = $(this.refs.input);
		if (!!this.props.focused) {
			input.focus();
		}
		input.focus(this.onFocus).blur(this.onBlur);
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
		this.setState({ value: event.target.value });
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
			if (e.ctrlKey && e.which === 13) {
				const text = input.val();
				if (!text) return;
				this.setState({ value: '' });
				props.submit(text);
			}
		};
		const textareaProps = {
			className,
			placeholder: 'Reply...',
			value: this.state.value,
			onKeyUp,
			onChange: this.onChange,
		};

		const showHelp = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ helpVisible: true });
			return false;
		};

		const showHelpButton = <a className={style.show_help} onMouseDown={showHelp}>?</a>;

		const helpProps = {
			className: style.help,
			isOpen: this.state.helpVisible,
			preferPlace: 'below',
			place: 'below',
			onOuterAction: () => this.setState({ helpVisible: false }),
			body: helpContent(),
		};

		const help = popover(helpProps, showHelpButton);

		return (
			<div className={style.reply_form}>
				{showHelpButton}
				{help}
				<textarea ref="input" {...textareaProps}/>
				<div className={style.reply_controls}>
					<a className={style.upload_button} data-toggle="tooltip" title="Upload images">
						<i className="ion-camera"/>
					</a>
				</div>
			</div>
		);
	}
}

export default MessageInput;
