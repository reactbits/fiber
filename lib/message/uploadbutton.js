'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = UploadButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _componentUpload = require('component-upload');

var _componentUpload2 = _interopRequireDefault(_componentUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UploadButton() {
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
			var upload = new _componentUpload2.default(file);
			upload.on('end', function (res) {
				console.log(res);
			});
			var options = {
				path: window.UPLOAD_PATH || '/api/uploads/'
			};
			upload.to(options);
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