import classNames from 'classnames';
import style from 'hint.css/hint.css';

export default function hint(...modifiers) {
	if (modifiers.length === 0) {
		return classNames(style['hint--top'], style['hint--rounded']);
	}
	return classNames(modifiers.map(k => style[`hint--${k}`]));
}
