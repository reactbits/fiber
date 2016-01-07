'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popover = _react2.default.createFactory(_reactPopover2.default);

function helpContent() {
	var quote = '> ';
	var monospaced = '`';
	return _react2.default.createElement(
		'div',
		null,
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
				' post'
			)
		)
	);
}

// TODO render user avatar
// TODO configure submit shortcut, ctrl-enter is default

var MessageInput = exports.MessageInput = (function (_Component) {
	_inherits(MessageInput, _Component);

	function MessageInput(props) {
		_classCallCheck(this, MessageInput);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MessageInput).call(this, props));

		_this.state = {
			value: props.value,
			helpVisible: false
		};
		_this.onFocus = _this.onFocus.bind(_this);
		_this.onBlur = _this.onBlur.bind(_this);
		_this.onChange = _this.onChange.bind(_this);
		return _this;
	}

	_createClass(MessageInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var input = $(this.refs.input);
			if (!!this.props.focused) {
				input.focus();
			}
			input.focus(this.onFocus).blur(this.onBlur);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var input = $(this.refs.input);
			input.off('focus').off('blur');
		}
	}, {
		key: 'onFocus',
		value: function onFocus() {
			$(_reactDom2.default.findDOMNode(this)).addClass(_style2.default.focused);
		}
	}, {
		key: 'onBlur',
		value: function onBlur() {
			$(_reactDom2.default.findDOMNode(this)).removeClass(_style2.default.focused);
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

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
				if (e.ctrlKey && e.which === 13) {
					var text = input.val();
					if (!text) return;
					input.val('');
					props.submit(text);
				}
			};
			var textareaProps = {
				className: className,
				placeholder: 'Reply...',
				value: this.state.value,
				onKeyUp: onKeyUp,
				onChange: this.onChange
			};

			var showHelp = function showHelp(e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.setState({ helpVisible: true });
				return false;
			};

			var showHelpButton = _react2.default.createElement(
				'a',
				{ className: _style2.default.show_help, onMouseDown: showHelp },
				'?'
			);

			var helpProps = {
				className: _style2.default.help,
				isOpen: this.state.helpVisible,
				preferPlace: 'below',
				place: 'below',
				onOuterAction: function onOuterAction() {
					return _this2.setState({ helpVisible: false });
				},
				body: helpContent()
			};

			var help = popover(helpProps, showHelpButton);

			return _react2.default.createElement(
				'div',
				{ className: _style2.default.reply_form },
				showHelpButton,
				help,
				_react2.default.createElement('textarea', _extends({ ref: 'input' }, textareaProps)),
				_react2.default.createElement(
					'div',
					{ className: _style2.default.reply_controls },
					_react2.default.createElement(
						'a',
						{ className: _style2.default.upload_button, 'data-toggle': 'tooltip', title: 'Upload images' },
						_react2.default.createElement('i', { className: 'ion-camera' })
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