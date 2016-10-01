import _ from 'lodash';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import style from './style.scss';

export default class Input extends Component {
  componentDidMount() {
    if (this.props.focused) {
      this.focus();
    }
  }

  input = null;

  focus() {
    if (this.input) {
      findDOMNode(this.input).focus(); // eslint-disable-line
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { cancel, submit, focused, ...props } = this.props || {};

    const onKeyUp = (e) => {
      if (e.which === 27) {
        const input = $(e.target);
        input.blur();
        if (_.isFunction(props.cancel)) {
          cancel();
          return;
        }
        return;
      }
      if (e.ctrlKey && e.which === 13 && _.isFunction(submit)) {
        submit();
      }
    };

    const attrs = {
      ref: (c) => { this.input = c; },
      className: props.className || style.input,
      type: 'text',
      onKeyUp,
      autoFocus: true,
      ...props,
    };

    return <textarea {...attrs} />;
  }
}
