'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Help = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

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

var Help = exports.Help = (function (_Component) {
	_inherits(Help, _Component);

	function Help(props) {
		_classCallCheck(this, Help);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Help).call(this, props));

		_this.state = {
			helpVisible: false
		};
		return _this;
	}

	_createClass(Help, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

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
				'span',
				null,
				showHelpButton,
				help
			);
		}
	}]);

	return Help;
})(_react.Component);

exports.default = Help;