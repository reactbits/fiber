'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UploadButton;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tusJsClient = require('tus-js-client');

var _tusJsClient2 = _interopRequireDefault(_tusJsClient);

var _style = require('./style.scss');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO configurable upload client: tus, component-upload, etc

function uploadFile(file) {
  var callback = arguments.length <= 1 || arguments[1] === undefined ? _lodash2.default.noop : arguments[1];

  // const upload = new Upload(file);
  // upload.on('end', res => {
  //   console.log(res);
  // });
  // const options = {
  //   path: window.UPLOAD_PATH || '/api/uploads/',
  // };
  // upload.to(options);

  // Create a new tus upload
  var upload = new _tusJsClient2.default.Upload(file, {
    // TODO enable resumable uploads
    resume: false,
    endpoint: window.UPLOAD_PATH || '/api/uploads/',
    onError: function onError(err) {
      console.log('upload failed:', err);
      callback(null, err);
    },
    onProgress: function onProgress(bytesUploaded, bytesTotal) {
      var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
      console.log('progress %s/%s, %s', bytesUploaded, bytesTotal, percentage + '%');
    },
    onSuccess: function onSuccess() {
      console.log('download %s from %s', upload.file.name, upload.url);
      callback({ name: upload.file.name, url: upload.url });
    }
  });

  // Start the upload
  upload.start();
}
// import Upload from 'component-upload';
function UploadButton(props) {
  var onClick = function onClick() {
    var inputStyle = 'display:block;visibility:hidden;width:0;height:0';
    var input = $('<input style="' + inputStyle + '" type="file" name="somename" size="chars">');
    input.appendTo($('body'));
    input.change(function () {
      console.log('uploading...');
      var files = input[0].files;
      console.log(files);
      var file = files[0];
      input.remove();
      uploadFile(file, function (data, err) {
        if (err) {
          if (_lodash2.default.isFunction(props.onError)) {
            props.onError(err);
          }
          return;
        }
        if (_lodash2.default.isFunction(props.onSuccess)) {
          props.onSuccess(data);
        }
      });
    });
    input.click();
  };
  var btnProps = {
    className: _style2.default.upload_button,
    title: 'Upload files',
    'data-toggle': 'tooltip',
    onMouseDown: onClick
  };
  return _react2.default.createElement(
    'a',
    btnProps,
    _react2.default.createElement('i', { className: 'ion-camera' })
  );
}