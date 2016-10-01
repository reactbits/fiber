'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.input = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.focused) {
        this.focus();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.input) {
        (0, _reactDom.findDOMNode)(this.input).focus(); // eslint-disable-line
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // eslint-disable-next-line no-unused-vars
      var _ref2 = this.props || {};

      var cancel = _ref2.cancel;
      var submit = _ref2.submit;
      var focused = _ref2.focused;

      var props = _objectWithoutProperties(_ref2, ['cancel', 'submit', 'focused']);

      var onKeyUp = function onKeyUp(e) {
        if (e.which === 27) {
          var input = $(e.target);
          input.blur();
          if (_lodash2.default.isFunction(props.cancel)) {
            cancel();
            return;
          }
          return;
        }
        if (e.ctrlKey && e.which === 13 && _lodash2.default.isFunction(submit)) {
          submit();
        }
      };

      var attrs = _extends({
        ref: function ref(c) {
          _this2.input = c;
        },
        className: props.className || _style2.default.input,
        type: 'text',
        onKeyUp: onKeyUp,
        autoFocus: true
      }, props);

      return _react2.default.createElement('textarea', attrs);
    }
  }]);

  return Input;
}(_react.Component);

exports.default = Input;