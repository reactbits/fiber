import _ from 'lodash';

export function updateObject(obj, update, isSelected) {
	if (isSelected(obj)) {
		return update(obj);
	}
	let result = obj;
	let changed = false;
	_.forOwn(obj, (val, key) => {
		const newVal = updateValue(val, update, isSelected);
		if (newVal === val) {
			return;
		}
		if (!changed) {
			result = { ...obj };
			changed = true;
		}
		result[key] = newVal;
	});
	return result;
}

function updateValue(val, update, isSelected) {
	if (_.isArray(val)) {
		return updateArray(val, update, isSelected);
	}
	if (_.isObject(val)) {
		return updateObject(val, update, isSelected);
	}
	return val;
}

export function updateArray(array, update, isSelected) {
	let copied = false;
	let result = array;
	array.forEach((t, i) => {
		const t2 = updateObject(t, update, isSelected);
		if (t2 === t) {
			return;
		}
		if (!copied) {
			result = [...array];
			copied = true;
		}
		result[i] = t2;
	});
	return result;
}
