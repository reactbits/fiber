'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Avatar = undefined;
exports.avatarSize = avatarSize;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactImageloader = require('react-imageloader');

var _reactImageloader2 = _interopRequireDefault(_reactImageloader);

var _common = require('../common');

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _gravatar = require('./gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

require('../tooltip');

var _util = require('../util');

var _hover = require('../hover');

var _hover2 = _interopRequireDefault(_hover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var avatarSizes = {
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

function avatarSize(value) {
	return (_lodash2.default.isString(value) ? avatarSizes[value.toLowerCase()] : value) || defaultSize;
}

function avatarURL(url) {
	if (_is_js2.default.email(url)) {
		return (0, _gravatar2.default)(url);
	}
	return url;
}

function makePreloader(size) {
	return function () {
		var css = {
			width: size,
			height: size
		};
		return _react2.default.createElement(
			'div',
			{ className: _style2.default.preloader, style: css },
			_react2.default.createElement(_common.Spinner, { size: size })
		);
	};
}

function RandomAvatar(props) {
	// TODO render random avatar
	var size = props.size;
	return _react2.default.createElement('img', { src: (0, _gravatar2.default)(props.src), width: size, height: size });
}

function makeWrapper(props) {
	return function (sourceProps, content) {
		var attrs = _extends({}, sourceProps, props);
		if (props.title) {
			attrs['data-toggle'] = 'tooltip';
		}
		return _react2.default.createElement(
			'div',
			attrs,
			content
		);
	};
}

var Avatar = exports.Avatar = (function (_Component) {
	_inherits(Avatar, _Component);

	function Avatar(props) {
		_classCallCheck(this, Avatar);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Avatar).call(this, props));

		var source = props.source;
		if (!source) {
			var user = props.user;
			if (user && _lodash2.default.isObject(user)) {
				source = user.avatar_url || user.avatar;
			}
		}

		_this.state = { source: source, user: props.user };
		return _this;
	}

	_createClass(Avatar, [{
		key: 'online',
		value: function online() {
			if (this.props.hasOwnProperty('online')) {
				return this.props.online;
			}
			var user = this.state.user;
			return user && _lodash2.default.isObject(user) && user.online;
		}
	}, {
		key: 'title',
		value: function title() {
			var value = this.props.title || this.props.name;
			if (value) return value;
			var user = this.state.user;
			if (user && _lodash2.default.isObject(user)) {
				return user.name || user.login;
			}
			return '';
		}
	}, {
		key: 'render',
		value: function render() {
			var _classNames,
			    _this2 = this;

			// TODO shadow
			var props = this.props;
			var shape = _style2.default[props.shape || 'circle'];
			var hoverEffect = (0, _hover2.default)(props.hover);
			var className = (0, _classnames2.default)(props.className, 'avatar', _style2.default.avatar, (_classNames = {}, _defineProperty(_classNames, shape, true), _defineProperty(_classNames, _style2.default.online, this.online()), _defineProperty(_classNames, _style2.default.circled, props.circled), _defineProperty(_classNames, hoverEffect, true), _classNames));

			var src = avatarURL(this.state.source);
			var size = avatarSize(this.props.size);
			var avatarStyle = _extends({
				width: size + 8,
				height: size + 8,
				marginLeft: -(size + 8)
			}, this.props.style);

			var imgProps = {
				width: size,
				height: size
			};

			var wrapper = makeWrapper({
				title: this.title()
			});

			var preloader = makePreloader(size);

			function empty() {
				return _react2.default.createElement(
					'div',
					{ className: className, style: avatarStyle },
					preloader()
				);
			}

			var sourcePromise = (0, _util.toPromise)(src);
			if (sourcePromise) {
				sourcePromise.then(function (value) {
					_this2.setState({ source: value });
				});
				return empty();
			}

			if (!src && this.props.user) {
				var userPromise = (0, _util.toPromise)(this.props.user);
				if (userPromise) {
					userPromise.then(function (user) {
						_this2.setState({
							user: user,
							source: user.avatar_url || user.avatar
						});
					});
					return empty();
				}
			}

			if (!_lodash2.default.isString(src)) {
				// TODO render error
				return empty();
			}

			var loaderProps = {
				src: src,
				wrapper: wrapper,
				preloader: preloader,
				imgProps: imgProps
			};

			return _react2.default.createElement(
				_reactImageloader2.default,
				_extends({ className: className, style: avatarStyle }, loaderProps),
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