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

var _avatar = require('../avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContributorList = function (_Component) {
  _inherits(ContributorList, _Component);

  function ContributorList(props) {
    _classCallCheck(this, ContributorList);

    var _this = _possibleConstructorReturn(this, (ContributorList.__proto__ || Object.getPrototypeOf(ContributorList)).call(this, props));

    _this.mounted = false;
    var users = props.users;

    _this.state = {
      users: _lodash2.default.isFunction(users) ? users() : users
    };
    return _this;
  }

  _createClass(ContributorList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.update(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.update(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      if (_lodash2.default.isFunction(this.unsubscribe)) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
  }, {
    key: 'update',
    value: function update(props) {
      var _this2 = this;

      if (_lodash2.default.isFunction(this.unsubscribe)) {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      var users = props.users;


      if (_lodash2.default.isFunction(users)) {
        var result = users(function (list) {
          if (!_this2.mounted) return;
          _this2.setState({ users: list });
        });
        if (_lodash2.default.isFunction(result)) {
          this.unsubscribe = result;
        } else if (_lodash2.default.isArray(result)) {
          this.setState({ users: result });
        }
      } else {
        this.setState({ users: users });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var items = _lodash2.default.map(this.state.users, function (user) {
        var avatarProps = {
          hover: 'grow',
          user: user,
          shape: 'round_rect',
          online: false,
          size: 24,
          style: {
            display: 'inline-block',
            margin: '0px'
          }
        };
        return _react2.default.createElement(_avatar2.default, _extends({ key: user.id }, avatarProps));
      });
      return _react2.default.createElement(
        'div',
        { className: _style2.default.contributor_list },
        items
      );
    }
  }]);

  return ContributorList;
}(_react.Component);

exports.default = ContributorList;