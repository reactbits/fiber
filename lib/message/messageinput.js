'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageInput = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO render user avatar
// TODO configure submit shortcut, alt-enter is default

var MessageInput = exports.MessageInput = (function (_Component) {
	_inherits(MessageInput, _Component);

	function MessageInput() {
		_classCallCheck(this, MessageInput);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(MessageInput).apply(this, arguments));
	}

	_createClass(MessageInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!!this.props.focused) {
				$(_reactDom2.default.findDOMNode(this)).find('.message-input').focus();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;
			var className = (0, _classnames2.default)('message-input', _style2.default.message_input);
			var onKeyUp = function onKeyUp(e) {
				if (e.which === 27) {
					if (_lodash2.default.isFunction(props.cancel)) {
						props.cancel();
						return;
					}
				}
				var input = $(e.target);
				if (e.altKey && e.which === 13) {
					var text = input.val();
					if (!text) return;
					input.val('');
					props.submit(text);
				}
			};
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('textarea', { className: className, placeholder: 'Reply...', onKeyUp: onKeyUp })
			);
		}
	}]);

	return MessageInput;
})(_react.Component);

MessageInput.propTypes = {
	submit: _react.PropTypes.func,
	cancel: _react.PropTypes.func,
	focused: _react.PropTypes.bool
};
MessageInput.defaultProps = {
	focused: false
};
exports.default = MessageInput;