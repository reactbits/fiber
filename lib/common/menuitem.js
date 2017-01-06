'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _contextmenu = require('./contextmenu.scss');

var _contextmenu2 = _interopRequireDefault(_contextmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props,
          href = _props.href,
          children = _props.children,
          link = _props.link,
          onClick = _props.onClick;

      if (href) {
        return _react2.default.createElement(
          'a',
          { href: href, onClick: onClick },
          children
        );
      }
      if (link) {
        return _react2.default.createElement(
          _reactRouter.Link,
          { to: link },
          children
        );
      }
      return _react2.default.createElement(
        'a',
        { onClick: onClick },
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.header) {
        return _react2.default.createElement(
          'div',
          { className: _contextmenu2.default.header_item },
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'span',
            { className: _contextmenu2.default.header_label },
            this.props.children
          )
        );
      }
      return _react2.default.createElement(
        'li',
        { className: _contextmenu2.default.menu_item, role: 'menuitem' },
        this.renderContent()
      );
    }
  }]);

  return MenuItem;
}(_react.Component);

exports.default = MenuItem;