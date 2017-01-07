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

  componentWillReceiveProps(nextProps) {
    if (nextProps.focused) {
      this.focus();
    }
  }

  input = null;

  focus() {
    if (this.input) {
      const node = findDOMNode(this.input);
      if (node) {
        node.focus();
      }
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { cancel, submit, focused, ...props } = this.props || {};

    const onKeyUp = (event) => {
      if (event.which === 27) {
        const input = $(event.target);
        input.blur();
        if (_.isFunction(props.cancel)) {
          cancel();
          return;
        }
        return;
      }
      if (event.ctrlKey && event.which === 13 && _.isFunction(submit)) {
        submit();
      }
    };

    const onMouseDown = () => {
      this.focus();
    };

    const attrs = {
      ref: (c) => { this.input = c; },
      className: props.className || style.input,
      type: 'text',
      onKeyUp,
      onMouseDown,
      ...props,
    };

    return <textarea {...attrs} />;
  }
}
