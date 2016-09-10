'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaderTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Spinner;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _loaders = require('loaders.css/src/loaders.scss');

var _loaders2 = _interopRequireDefault(_loaders);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const defaultType = 'ball-beat';
var defaultType = 'ball-scale-multiple';

// TODO fix loader styles (also make it relative to image size)
var loaders = {
  'ball-pulse': {
    dots: 3,
    size: '6px'
  },
  'ball-grid-pulse': {
    dots: 9
  },
  'ball-clip-rotate': {
    dots: 1
  },
  'ball-clip-rotate-pulse': {
    dots: 2
  },
  'square-spin': {
    dots: 1
  },
  'ball-clip-rotate-multiple': {
    dots: 2
  },
  'ball-pulse-rise': {
    dots: 5
  },
  'ball-rotate': {
    dots: 1
  },
  'cube-transition': {
    dots: 2
  },
  'ball-zig-zag': {
    dots: 2
  },
  'ball-zig-zag-deflect': {
    dots: 2
  },
  'ball-triangle-path': {
    dots: 3
  },
  'ball-scale': {
    dots: 1
  },
  'line-scale': {
    dots: 5
  },
  'line-scale-party': {
    dots: 4
  },
  'ball-scale-multiple': {
    dots: 3,
    size: '32px',
    left: '-16px',
    top: '16px'
  },
  'ball-pulse-sync': {
    dots: 3
  },
  'ball-beat': {
    dots: 3,
    size: '6px'
  },
  'line-scale-pulse-out': {
    dots: 5
  },
  'line-scale-pulse-out-rapid': {
    dots: 5
  },
  'ball-scale-ripple': {
    dots: 1
  },
  'ball-scale-ripple-multiple': {
    dots: 3,
    size: '32px',
    left: '-16px',
    top: '8px'
  },
  'ball-spin-fade-loader': {
    dots: 8
  },
  'line-spin-fade-loader': {
    dots: 8
  },
  'triangle-skew-spin': {
    dots: 1
  },
  pacman: {
    dots: 5
  },
  'ball-grid-beat': {
    dots: 9
  },
  'semi-circle-spin': {
    dots: 1
  }
};

var loaderTypes = exports.loaderTypes = Object.keys(loaders);

function dots(props) {
  return _lodash2.default.range(props.dots).map(function (i) {
    var style = {};
    var attrs = { style: style };
    if (props.size) {
      style.width = props.size;
      style.height = props.size;
    }
    if (props.left) {
      style.left = props.left;
    }
    if (props.top) {
      style.top = props.top;
    }
    return _react2.default.createElement('div', _extends({ key: i }, attrs));
  });
}

function Spinner(props) {
  var _React$DOM;

  var type = props.type || defaultType;
  var className = (0, _classnames2.default)(_style2.default.loader_inner, _loaders2.default[type]);
  var args = [{ className: className }, dots(loaders[type])];
  var inner = (_React$DOM = _react2.default.DOM).div.apply(_React$DOM, args);
  var loaderProps = {
    className: _style2.default.loader
  };
  if (props.size) {
    loaderProps.style = {
      width: props.size,
      height: props.size,
      display: 'table-cell',
      verticalAlign: 'middle'
    };
  }
  return _react2.default.createElement(
    'div',
    loaderProps,
    inner
  );
}