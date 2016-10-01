'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = newChannelDialog;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reflexbox = require('reflexbox');

var _reactBootstrap = require('react-bootstrap');

var _reactbitsInput = require('reactbits-input');

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      show: true
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var close = function close() {
        return _this2.setState({ show: false });
      };
      var inputs = {
        name: {
          name: 'name',
          placeholder: 'Channel name',
          required: true
        },
        description: {
          name: 'description',
          placeholder: 'Description'
        }
      };
      return _react2.default.createElement(
        _reactBootstrap.Modal,
        { dialogClassName: _style2.default.new_channel_dialog, show: this.state.show, onHide: close },
        _react2.default.createElement(
          _reactbitsInput.Form,
          { onSubmit: this.props.submit },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'Create new channel'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              _reflexbox.Flex,
              null,
              _react2.default.createElement(
                _reflexbox.Box,
                { col: 12 },
                _react2.default.createElement(_reactbitsInput.Input, inputs.name),
                _react2.default.createElement(_reactbitsInput.Input, inputs.description)
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { type: 'submit', bsStyle: 'primary' },
              'Create'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: close },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return Dialog;
}(_react.Component);

function newChannelDialog(callback) {
  var wrapper = null;
  var submit = function submit(data) {
    setTimeout(function () {
      _reactDom2.default.unmountComponentAtNode(wrapper);
      wrapper.remove();
      callback(data);
    }, 100);
  };
  wrapper = document.body.appendChild(document.createElement('div'));
  _reactDom2.default.render(_react2.default.createElement(Dialog, { submit: submit }), wrapper);
}