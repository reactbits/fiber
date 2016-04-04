import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Flex, Box } from 'reflexbox';
import { Modal, Button } from 'react-bootstrap';
import Input from 'reactbits-input';
import style from './style';
import _ from 'lodash';

class Dialog extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			name: '',
			description: '',
			hiddenValidationState: true,
			validationState: {},
		};
	}

	isValid() {
		return _.reduce(this.state.validationState, (p, v) => p && v, true);
	}

	render() {
		const close = () => this.setState({ show: false });
		const changeHandler = name => (value, isValid) => {
			const vs = _.assign(this.state.validationState, { [name]: isValid });
			this.setState({
				[name]: value,
				validationState: vs,
				hiddenInvalidState: true,
			});
		};
		const inputs = {
			name: {
				name: 'name',
				placeholder: 'Channel name',
				value: this.state.name,
				required: true,
				onChange: changeHandler('name'),
				hiddenInvalidState: this.state.hiddenInvalidState,
			},
			description: {
				name: 'description',
				placeholder: 'Description',
				value: this.state.description,
				onChange: changeHandler('description'),
				hiddenInvalidState: this.state.hiddenInvalidState,
			},
		};
		const submit = () => {
			if (!this.isValid()) {
				this.setState({ hiddenInvalidState: false });
				return;
			}
			this.setState({ hiddenInvalidState: true });
			this.props.submit(_.pick(this.state, 'name', 'description'));
		};
		return (
			<Modal dialogClassName={style.new_channel_dialog} show={this.state.show} onHide={close}>
				<Modal.Header closeButton>
					<Modal.Title>Create new channel</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Flex>
						<Box col={12}>
							<Input {...inputs.name} />
							<Input {...inputs.description} />
						</Box>
					</Flex>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="primary" onClick={submit}>Create</Button>
					<Button onClick={close}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default function newChannelDialog(callback) {
	let wrapper = null;
	const submit = data => {
		ReactDOM.unmountComponentAtNode(wrapper);
		wrapper.remove();
		callback(data);
	};
	wrapper = document.body.appendChild(document.createElement('div'));
	ReactDOM.render(<Dialog submit={submit} />, wrapper);
}
