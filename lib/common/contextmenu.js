'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _contextmenu = require('./contextmenu.scss');

var _contextmenu2 = _interopRequireDefault(_contextmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popover = _react2.default.createFactory(_reactPopover2.default);

var ContextMenu = function (_Component) {
	_inherits(ContextMenu, _Component);

	function ContextMenu(props) {
		_classCallCheck(this, ContextMenu);

		var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

		_this.state = {
			dropdownVisible: false
		};
		return _this;
	}

	_createClass(ContextMenu, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var button = this.props.button;


			var hide = function hide() {
				return _this2.setState({ dropdownVisible: false });
			};
			var showDropdown = function showDropdown(e) {
				e.preventDefault();
				e.stopPropagation();
				_this2.setState({ dropdownVisible: true });
				return false;
			};

			var buttonProps = {
				className: (0, _classnames2.default)(_contextmenu2.default.show_button, button.className),
				onMouseDown: showDropdown
			};
			var buttonElement = _react2.default.createElement(
				'a',
				buttonProps,
				button.content
			);

			var dropdownProps = {
				className: _contextmenu2.default.context_menu,
				isOpen: this.state.dropdownVisible,
				preferPlace: 'below',
				place: 'below',
				onOuterAction: hide,
				body: _react2.default.createElement(
					'ul',
					{ className: _contextmenu2.default.menu_items, onClick: hide },
					this.props.children
				),
				refreshIntervalMs: false
			};

			return _react2.default.createElement(
				'span',
				null,
				popover(dropdownProps, buttonElement)
			);
		}
	}]);

	return ContextMenu;
}(_react.Component);

exports.default = ContextMenu;