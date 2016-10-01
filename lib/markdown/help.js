'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Help;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Content() {
  var quote = '> ';
  var monospaced = '`';
  return _react2.default.createElement(
    'div',
    { className: _style2.default.help_content },
    _react2.default.createElement(
      'div',
      { className: _style2.default.help_format },
      _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'b',
          null,
          '*bold*'
        )
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'i',
          null,
          '_italic_'
        )
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        quote,
        'quoted'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        { className: _style2.default.monospaced },
        monospaced,
        'monospaced',
        monospaced
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        '[title](link)'
      ),
      _react2.default.createElement('br', null)
    ),
    _react2.default.createElement(
      'div',
      { className: _style2.default.help_code },
      _react2.default.createElement(
        'span',
        null,
        '```js'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        'javascript code'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'span',
        null,
        '```'
      ),
      _react2.default.createElement('br', null)
    ),
    _react2.default.createElement(
      'div',
      { className: _style2.default.help_post },
      _react2.default.createElement(
        'em',
        null,
        'ctrl'
      ),
      ' + ',
      _react2.default.createElement(
        'em',
        null,
        'enter'
      ),
      _react2.default.createElement(
        'span',
        null,
        '\xA0post'
      )
    )
  );
}

function Help() {
  var menuProps = {
    button: {
      className: _style2.default.show_help,
      content: '?'
    }
  };
  return _react2.default.createElement(
    _common.ContextMenu,
    menuProps,
    _react2.default.createElement(Content, null)
  );
}