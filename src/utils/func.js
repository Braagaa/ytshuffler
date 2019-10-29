export const tap = fn => arg => {
	fn(arg);
	return arg;
};

export const set = (key, value) => obj => {
	obj[key] = value;
	return obj;
};

export const adjustProp = (key, fn) => obj => ({
	...obj,
	[key]: fn(obj[key])
});

export const spliceInto = (arr1, start, deleteCount) => arr2 => {
	const newArr = [...arr1];
	newArr.splice(start, deleteCount, ...arr2);
	return newArr;
};

export const flipObject = obj => Object.entries(obj)
	.reduce((acc, [key, value]) => set(value, key)(acc), {});

export const noDup = arr => Array.from(new Set(arr));

export const call = (...arg) => fn => fn(...arg);

export const isEmpty = obj => Object.keys(obj).length === 0;
