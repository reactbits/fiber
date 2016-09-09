import React from 'react';
import style from './style.scss';
import { ContextMenu } from '../common';

function Content() {
	const quote = '> ';
	const monospaced = '`';
	return (
		<div className={style.help_content}>
			<div className={style.help_format}>
				<span><b>*bold*</b></span><br />
				<span><i>_italic_</i></span><br />
				<span>{quote}{'quoted'}</span><br />
				<span className={style.monospaced}>{monospaced}{'monospaced'}{monospaced}</span><br />
				<span>[title](link)</span><br />
			</div>
			<div className={style.help_code}>
				<span>{'```js'}</span><br />
				<span>javascript code</span><br />
				<span>{'```'}</span><br />
			</div>
			<div className={style.help_post}>
				<em>ctrl</em>
				{' + '}
				<em>enter</em>
				<span>&nbsp;post</span>
			</div>
		</div>
	);
}

export default function Help() {
	const menuProps = {
		button: {
			className: style.show_help,
			content: '?',
		},
	};
	return (
		<ContextMenu {...menuProps}>
			<Content />
		</ContextMenu>
	);
}
