'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ThreadForm = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messageinput = require('../message/messageinput');

var _messageinput2 = _interopRequireDefault(_messageinput);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ThreadForm = exports.ThreadForm = (function (_Component) {
	_inherits(ThreadForm, _Component);

	function ThreadForm(props) {
		_classCallCheck(this, ThreadForm);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ThreadForm).call(this, props));

		_this.state = {
			subject: '',
			body: ''
		};
		_this.onSubjectChange = _this.onSubjectChange.bind(_this);
		_this.onBodyChange = _this.onBodyChange.bind(_this);
		return _this;
	}

	_createClass(ThreadForm, [{
		key: 'onSubjectChange',
		value: function onSubjectChange(event) {
			var value = event.target.value || '';
			this.setState({ subject: value });
		}
	}, {
		key: 'onBodyChange',
		value: function onBodyChange(body) {
			this.setState({ body: body });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var canSubmit = function canSubmit() {
				return _this2.state.subject.length > 0 && _this2.state.body.length > 0;
			};
			var submit = function submit() {
				var subject = _this2.state.subject;
				var body = _this2.state.body;
				if (!subject || !body) {
					// TODO show validation errors
					return;
				}
				_this2.setState({ subject: '', body: '' });
				props.submit({ subject: subject, body: body });
			};
			var subjectProps = {
				className: (0, _classnames2.default)(props.className, _style2.default.input),
				type: 'text',
				rows: 1,
				placeholder: 'Subject',
				value: this.state.subject,
				onChange: this.onSubjectChange,
				style: {
					width: '100%'
				}
			};
			var bodyProps = {
				placeholder: 'Write your message here...',
				canSubmit: canSubmit,
				submit: submit,
				value: this.state.body,
				onChange: this.onBodyChange
			};
			return _react2.default.createElement(
				'div',
				{ className: 'thread-form', style: { marginBottom: '24px' } },
				_react2.default.createElement('textarea', subjectProps),
				_react2.default.createElement(_messageinput2.default, bodyProps)
			);
		}
	}]);

	return ThreadForm;
})(_react.Component);

exports.default = ThreadForm;