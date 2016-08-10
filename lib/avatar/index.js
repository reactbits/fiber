'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _avatar = require('./avatar');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_avatar).default;
  }
});
Object.defineProperty(exports, 'avatarSize', {
  enumerable: true,
  get: function get() {
    return _avatar.avatarSize;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }