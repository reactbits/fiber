import _ from 'lodash';
import React from 'react';
import tus from 'tus-js-client';
// import Upload from 'component-upload';
import style from './style.scss';

// TODO configurable upload client: tus, component-upload, etc

function uploadFile(file, callback = _.noop) {
	// const upload = new Upload(file);
	// upload.on('end', res => {
	// 	console.log(res);
	// });
	// const options = {
	// 	path: window.UPLOAD_PATH || '/api/uploads/',
	// };
	// upload.to(options);

	// Create a new tus upload
	const upload = new tus.Upload(file, {
		// TODO enable resumable uploads
		resume: false,
		endpoint: window.UPLOAD_PATH || '/api/uploads/',
		onError(err) {
			console.log('upload failed:', err);
			callback(null, err);
		},
		onProgress(bytesUploaded, bytesTotal) {
			const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
			console.log('progress %s/%s, %s', bytesUploaded, bytesTotal, `${percentage}%`);
		},
		onSuccess() {
			console.log('download %s from %s', upload.file.name, upload.url);
			callback({ name: upload.file.name, url: upload.url });
		},
	});

	// Start the upload
	upload.start();
}

export default function UploadButton(props) {
	const onClick = () => {
		const inputStyle = 'display:block;visibility:hidden;width:0;height:0';
		const input = $(`<input style="${inputStyle}" type="file" name="somename" size="chars">`);
		input.appendTo($('body'));
		input.change(() => {
			console.log('uploading...');
			const files = input[0].files;
			console.log(files);
			const file = files[0];
			input.remove();
			uploadFile(file, (data, err) => {
				if (err) {
					if (_.isFunction(props.onError)) {
						props.onError(err);
					}
					return;
				}
				if (_.isFunction(props.onSuccess)) {
					props.onSuccess(data);
				}
			});
		});
		input.click();
	};
	const btnProps = {
		className: style.upload_button,
		title: 'Upload files',
		'data-toggle': 'tooltip',
		onMouseDown: onClick,
	};
	return (
		<a {...btnProps}><i className="ion-camera" /></a>
	);
}
