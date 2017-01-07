import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { Input } from '../common';
import Help from '../markdown/help';
import UploadButton from './uploadbutton';
import style from './style.scss';

// TODO render user avatar
// TODO configure submit shortcut, ctrl-enter is default

export default class MessageInput extends Component {
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
      focused: this.props.focused,
      value: props.value || '',
      helpVisible: false,
    };

    this.onChange = this.onChange.bind(this);

    const self = this;
    function makeFocusTransition(focused) {
      return () => {
        if (focused && _.isFunction(props.onFocus)) {
          props.onFocus();
        }
        if (!focused && _.isFunction(props.onBlur)) {
          props.onBlur();
        }
        self.setState({ focused });
      };
    }
    this.onFocus = makeFocusTransition(true);
    this.onBlur = makeFocusTransition(false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.focused !== nextProps.focused) {
      this.setState({ focused: nextProps.focused });
    }
  }

  onChange(event) {
    const value = event.target.value || '';
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
    this.setState({ value });
  }

  render() {
    const canSubmit = _.isFunction(this.props.canSubmit) ?
                        this.props.canSubmit
                        : () => this.state.value.length > 0;
    const submit = () => {
      const { value } = this.state;
      if (!value) return;
      this.setState({ value: '' });
      this.props.submit(value);
    };
    const inputProps = {
      className: classNames(style.input, style.message_input),
      placeholder: this.props.placeholder || 'Reply...',
      value: this.state.value,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      cancel: this.props.cancel,
      submit,
      focused: this.state.focused,
    };
    const submitProps = {
      className: 'pull-right',
      bsStyle: 'primary',
      bsSize: 'small',
      onMouseDown: submit,
      disabled: !canSubmit(),
    };
    const formProps = {
      className: classNames(style.reply_form, { [style.focused]: this.state.focused }),
      style: (this.props.formStyle || {}),
    };
    const onUpload = (data) => {
      let content = this.state.value || '';
      if (content) {
        content += '\r\n';
      }
      content += `[${data.name}](${data.url})`;
      this.setState({ value: content });
    };
    const uploadProps = {
      onSuccess: onUpload,
    };
    return (
      <div {...formProps}>
        <Help />
        <Input {...inputProps} />
        <div className={style.reply_controls}>
          <UploadButton {...uploadProps} />
          <Button {...submitProps}>Post</Button>
        </div>
      </div>
    );
  }
}
