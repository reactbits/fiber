import React, { Component } from 'react';
import PopoverClass from 'react-popover';
import style from './style';

const popover = React.createFactory(PopoverClass);

function helpContent() {
	const quote = '> ';
	const monospaced = '`';
	return (
		<div>
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

export class Help extends Component {
	constructor(props) {
		super(props);
		this.state = {
			helpVisible: false,
		};
	}
	render() {
		const showHelp = (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ helpVisible: true });
			return false;
		};
		const showHelpButton = <a className={style.show_help} onMouseDown={showHelp}>?</a>;

		const helpProps = {
			className: style.help,
			isOpen: this.state.helpVisible,
			preferPlace: 'below',
			place: 'below',
			onOuterAction: () => this.setState({ helpVisible: false }),
			body: helpContent(),
		};
		const help = popover(helpProps, showHelpButton);

		return (
			<span>
				{showHelpButton}
				{help}
			</span>
		);
	}
}

export default Help;
