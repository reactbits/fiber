import React from 'react';
import classNames from 'classnames';
import css from 'loaders.css/src/loaders';
import styles from './style';
import _ from 'lodash';

// const defaultType = 'ball-beat';
const defaultType = 'ball-scale-multiple';

// TODO fix loader styles (also make it relative to image size)
const loaders = {
	'ball-pulse': {
		dots: 3,
		size: '6px',
	},
	'ball-grid-pulse': {
		dots: 9,
	},
	'ball-clip-rotate': {
		dots: 1,
	},
	'ball-clip-rotate-pulse': {
		dots: 2,
	},
	'square-spin': {
		dots: 1,
	},
	'ball-clip-rotate-multiple': {
		dots: 2,
	},
	'ball-pulse-rise': {
		dots: 5,
	},
	'ball-rotate': {
		dots: 1,
	},
	'cube-transition': {
		dots: 2,
	},
	'ball-zig-zag': {
		dots: 2,
	},
	'ball-zig-zag-deflect': {
		dots: 2,
	},
	'ball-triangle-path': {
		dots: 3,
	},
	'ball-scale': {
		dots: 1,
	},
	'line-scale': {
		dots: 5,
	},
	'line-scale-party': {
		dots: 4,
	},
	'ball-scale-multiple': {
		dots: 3,
		size: '32px',
		left: '-16px',
		top: '16px',
	},
	'ball-pulse-sync': {
		dots: 3,
	},
	'ball-beat': {
		dots: 3,
		size: '6px',
	},
	'line-scale-pulse-out': {
		dots: 5,
	},
	'line-scale-pulse-out-rapid': {
		dots: 5,
	},
	'ball-scale-ripple': {
		dots: 1,
	},
	'ball-scale-ripple-multiple': {
		dots: 3,
		size: '32px',
		left: '-16px',
		top: '8px',
	},
	'ball-spin-fade-loader': {
		dots: 8,
	},
	'line-spin-fade-loader': {
		dots: 8,
	},
	'triangle-skew-spin': {
		dots: 1,
	},
	pacman: {
		dots: 5,
	},
	'ball-grid-beat': {
		dots: 9,
	},
	'semi-circle-spin': {
		dots: 1,
	},
};

export const loaderTypes = Object.keys(loaders);

function dots(props) {
	return _.range(props.dots).map(i => {
		const style = {};
		const attrs = { style };
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
		return <div key={i} {...attrs} />;
	});
}

export default function Spinner(props) {
	const type = props.type || defaultType;
	const className = classNames(styles.loader_inner, css[type]);
	const args = [
		{ className },
		dots(loaders[type]),
	];
	const inner = React.DOM.div(...args);
	const loaderProps = {
		className: styles.loader,
	};
	if (props.size) {
		loaderProps.style = {
			width: props.size,
			height: props.size,
			display: 'table-cell',
			verticalAlign: 'middle',
		};
	}
	return (
		<div {...loaderProps}>{inner}</div>
	);
}
