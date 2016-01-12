import React from 'react';
import style from './style';
import Upload from 'component-upload';

export default function UploadButton() {
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
			const upload = new Upload(file);
			upload.on('end', res => {
				console.log(res);
			});
			const options = {
				path: window.UPLOAD_PATH || '/api/uploads/',
			};
			upload.to(options);
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
		<a {...btnProps}><i className="ion-camera"/></a>
	);
}
