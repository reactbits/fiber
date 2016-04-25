import React, { Component } from 'react';
import classNames from 'classnames';
import { Input } from '../common';
import MessageInput from '../message/messageinput';
import style from './style.scss';

export class ThreadForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			subject: '',
			body: '',
			subjectFocused: false,
			bodyFocused: false,
		};

		this.onSubjectChange = this.onSubjectChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);

		const self = this;
		function makeTransition(state) {
			return ()	=> {
				self.setState(state);
			};
		}
		this.onSubjectFocus = makeTransition({ subjectFocused: true });
		this.onSubjectBlur = makeTransition({ subjectFocused: false });
		this.onBodyFocus = makeTransition({ bodyFocused: true });
		this.onBodyBlur = makeTransition({ bodyFocused: false });
	}

	onSubjectChange(event) {
		const value = event.target.value || '';
		this.setState({ subject: value });
	}

	onBodyChange(body) {
		this.setState({ body });
	}

	render() {
		const props = this.props;
		const canSubmit = () => {
			const { subject, body } = this.state;
			return subject.length > 0 && body.length > 0;
		};
		const submit = () => {
			const subject = this.state.subject;
			const body = this.state.body;
			if (!subject || !body) {
				// TODO show validation errors
				return;
			}
			this.setState({ subject: '', body: '' });
			props.submit({ subject, body });
		};
		const subjectProps = {
			className: classNames(style.input, style.subject_input),
			rows: 1,
			placeholder: 'Subject',
			value: this.state.subject,
			onChange: this.onSubjectChange,
			onFocus: this.onSubjectFocus,
			onBlur: this.onSubjectBlur,
		};
		const bodyProps = {
			placeholder: 'Write your message here...',
			canSubmit,
			submit,
			value: this.state.body,
			onChange: this.onBodyChange,
			onFocus: this.onBodyFocus,
			onBlur: this.onBodyBlur,
			formStyle: {
				margin: '0px',
				padding: '0px',
			},
		};
		const formProps = {
			className: style.thread_form,
			style: { marginBottom: '24px' },
		};
		if (this.state.subjectFocused || this.state.bodyFocused) {
			return (
				<div {...formProps}>
					<Input {...subjectProps} />
					<MessageInput {...bodyProps} />
				</div>
			);
		}
		const placeholderProps = {
			className: classNames(style.input, style.subject_input),
			rows: 1,
			placeholder: 'Start a new topic...',
			onFocus: this.onSubjectFocus,
		};
		return (
			<div {...formProps}>
				<Input {...placeholderProps} />
			</div>
		);
	}
}

export default ThreadForm;
