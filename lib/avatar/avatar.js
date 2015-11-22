'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Avatar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _ClipLoader = require('halogen/ClipLoader');

var _ClipLoader2 = _interopRequireDefault(_ClipLoader);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is = require('./is');

var _is2 = _interopRequireDefault(_is);

var _gravatar = require('./gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

require('../tooltip');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var avatarSize = {
	small: 24,
	sm: 24,
	s: 24,
	normal: 32,
	medium: 32,
	m: 32,
	large: 40,
	l: 40,
	xl: 64
};

var defaultSize = 32;

var mapSize = function mapSize(value) {
	return (_lodash2.default.isString(value) ? avatarSize[value.toLowerCase()] : value) || defaultSize;
};

var avatarURL = function avatarURL(url) {
	if (_is2.default.email(url)) {
		return (0, _gravatar2.default)(url);
	}
	return url;
};

function preloader() {
	var css = {
		marginLeft: 16,
		marginTop: 16
	};
	return _react2.default.createElement(
		'div',
		{ style: css },
		_react2.default.createElement(_ClipLoader2.default, { color: '#4DAF7C', size: '32px' })
	);
}

var RandomAvatar = function RandomAvatar(props) {
	// TODO render random avatar
	var size = props.size;
	return _react2.default.createElement('img', { src: (0, _gravatar2.default)(props.src), width: size, height: size });
};

var makeWrapper = function makeWrapper(title) {
	return function (props, content) {
		var attrs = _extends({}, props);
		if (title) {
			attrs['data-toggle'] = 'tooltip';
			attrs.title = title;
		}
		return _react2.default.createElement(
			'div',
			attrs,
			content
		);
	};
};

var Avatar = (function (_Component) {
	_inherits(Avatar, _Component);

	function Avatar(props) {
		_classCallCheck(this, Avatar);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Avatar).call(this, props));

		_this.state = { source: props.source };
		_this.setSource = _this.setSource.bind(_this);
		return _this;
	}

	_createClass(Avatar, [{
		key: 'setSource',
		value: function setSource(value) {
			return this.setState({ source: value });
		}
	}, {
		key: 'render',
		value: function render() {
			// TODO circled
			// TODO shadow
			// TODO animated (rotate on hover)
			var className = 'avatar ' + _style2.default.hover_rotate + ' ' + _style2.default.avatar + ' ' + this.props.className;
			var src = avatarURL(this.state.source);
			var size = mapSize(this.props.size);
			var avatarStyle = _extends({}, this.props.style, {
				marginLeft: -(size + 8)
			});

			var imgProps = {
				width: size,
				height: size
			};

			var wrapper = makeWrapper(this.props.name);

			var promise = (0, _util.toPromise)(src);
			if (promise) {
				promise.then(this.setSource);
				return _react2.default.createElement(
					'div',
					{ className: className, style: avatarStyle },
					preloader
				);
			}

			if (!_lodash2.default.isString(src)) {
				throw new Error('invalid source property');
			}

			return _react2.default.createElement(
				_reactImageloader2.default,
				{ className: className, style: avatarStyle,
					src: src, wrapper: wrapper, preloader: preloader, imgProps: imgProps },
				_react2.default.createElement(RandomAvatar, { src: src, size: size })
			);
		}
	}]);

	return Avatar;
})(_react.Component);

Avatar.propTypes = {
	className: _react.PropTypes.string,
	size: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	style: _react.PropTypes.object
};
Avatar.defaultProps = {
	className: '',
	size: 'normal',
	style: {}
};
exports.default = Avatar;
exports.Avatar = Avatar;