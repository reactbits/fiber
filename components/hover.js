import classNames from 'classnames';
import style from 'hover.css/scss/hover';
import _ from 'lodash';

export function hover(...effects) {
	const classList = effects.filter(_.identity).map(name => style['hvr-' + name]);
	return classNames(...classList);
}

export default hover;
