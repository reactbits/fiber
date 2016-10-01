import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Flex, Box } from 'reflexbox';
import { Modal, Button } from 'react-bootstrap';
import { Form, Input } from 'reactbits-input';
import style from './style.scss';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  render() {
    const close = () => this.setState({ show: false });
    const inputs = {
      name: {
        name: 'name',
        placeholder: 'Channel name',
        required: true,
      },
      description: {
        name: 'description',
        placeholder: 'Description',
      },
    };
    return (
      <Modal dialogClassName={style.new_channel_dialog} show={this.state.show} onHide={close}>
        <Form onSubmit={this.props.submit}>
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
            <Button type="submit" bsStyle="primary">Create</Button>
            <Button onClick={close}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default function newChannelDialog(callback) {
  let wrapper = null;
  const submit = (data) => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(wrapper);
      wrapper.remove();
      callback(data);
    }, 100);
  };
  wrapper = document.body.appendChild(document.createElement('div'));
  ReactDOM.render(<Dialog submit={submit} />, wrapper);
}
