import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './contextMenuStyle.scss';

export default class MenuItem extends Component {
  renderContent() {
    const { href, children, link, onClick } = this.props;
    if (href) {
      return <a href={href} onClick={onClick}>{children}</a>;
    }
    if (link) {
      return <Link to={link}>{children}</Link>;
    }
    return <a onClick={onClick}>{children}</a>;
  }

  render() {
    if (this.props.header) {
      return (
        <div className={styles.header_item}>
          <hr />
          <span className={styles.header_label}>{this.props.children}</span>
        </div>
      );
    }
    return (
      <li className={styles.menu_item} role="menuitem">
        {this.renderContent()}
      </li>
    );
  }
}
