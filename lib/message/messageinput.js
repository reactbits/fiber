'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageInput = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactBootstrap = require('react-bootstrap');

var _common = require('../common');

var _help = require('../markdown/help');

var _help2 = _interopRequireDefault(_help);

var _uploadbutton = require('./uploadbutton');

var _uploadbutton2 = _interopRequireDefault(_uploadbutton);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO render user avatar
// TODO configure submit shortcut, ctrl-enter is default

var MessageInput = exports.MessageInput = (function (_Component) {
	_inherits(MessageInput, _Component);

	function MessageInput(props) {
		_classCallCheck(this, MessageInput);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageInput).call(this, props));

		_this.state = {
			focused: _this.props.focused,
			value: props.value || '',
			helpVisible: false
		};

		_this.onChange = _this.onChange.bind(_this);

		var self = _this;
		function makeFocusTransition(focused) {
			return function () {
				if (focused && _lodash2.default.isFunction(props.onFocus)) {
					props.onFocus();
				}
				if (!focused && _lodash2.default.isFunction(props.onBlur)) {
					props.onBlur();
				}
				self.setState({ focused: focused });
			};
		}
		_this.onFocus = makeFocusTransition(true);
		_this.onBlur = makeFocusTransition(false);
		return _this;
	}

	_createClass(MessageInput, [{
		key: 'onChange',
		value: function onChange(event) {
			var value = event.target.value || '';
			if (_lodash2.default.isFunction(this.props.onChange)) {
				this.props.onChange(value);
			}
			this.setState({ value: value });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var canSubmit = _lodash2.default.isFunction(props.canSubmit) ? props.canSubmit : function () {
				return _this2.state.value.length > 0;
			};
			var submit = function submit() {
				var value = _this2.state.value;

				if (!value) return;
				_this2.setState({ value: '' });
				props.submit(value);
			};
			var inputProps = {
				className: (0, _classnames2.default)('message-input', _style2.default.input, _style2.default.message_input),
				placeholder: props.placeholder || 'Reply...',
				value: this.state.value,
				onChange: this.onChange,
				onFocus: this.onFocus,
				onBlur: this.onBlur,
				cancel: props.cancel,
				submit: submit,
				focused: this.state.focused
			};
			var submitProps = {
				className: 'pull-right',
				bsStyle: 'primary',
				bsSize: 'small',
				onMouseDown: submit,
				disabled: !canSubmit()
			};
			var formProps = {
				className: (0, _classnames2.default)(_style2.default.reply_form, _defineProperty({}, _style2.default.focused, this.state.focused)),
				style: props.formStyle || {}
			};
			var onUpload = function onUpload(data) {
				var content = _this2.state.value || '';
				if (content) {
					content += '\r\n';
				}
				content += '[' + data.name + '](' + data.url + ')';
				_this2.setState({ value: content });
			};
			var uploadProps = {
				onSuccess: onUpload
			};
			return _react2.default.createElement(
				'div',
				formProps,
				_react2.default.createElement(_help2.default, null),
				_react2.default.createElement(_common.Input, inputProps),
				_react2.default.createElement(
					'div',
					{ className: _style2.default.reply_controls },
					_react2.default.createElement(_uploadbutton2.default, uploadProps),
					_react2.default.createElement(
						_reactBootstrap.Button,
						submitProps,
						'Post'
					)
				)
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