import React, { Component } from 'react';
import classNames from 'classnames';
import MessageInput from '../message/messageinput';
import style from './style';

export class ThreadForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			body: '',
		};
		this.onSubjectChange = this.onSubjectChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
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
			return this.state.subject.length > 0 && this.state.body.length > 0;
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
			className: classNames(props.className, style.input),
			type: 'text',
			rows: 1,
			placeholder: 'Subject',
			value: this.state.subject,
			onChange: this.onSubjectChange,
			style: {
				width: '100%',
			},
		};
		const bodyProps = {
			placeholder: 'Write your message here...',
			canSubmit,
			submit,
			value: this.state.body,
			onChange: this.onBodyChange,
		};
		return (
			<div className="thread-form" style={{ marginBottom: '24px' }}>
				<textarea {...subjectProps}/>
				<MessageInput {...bodyProps}/>
			</div>
		);
	}
}

export default ThreadForm;
