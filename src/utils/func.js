export const tap = fn => arg => {
	fn(arg);
	return arg;
};

export const reThrow = fn => value => {
	fn(value);
	throw value;
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

export const path = str => obj => str
	.split('.')
	.reduce((acc, str) => acc[str], obj);

export const flipObject = obj => Object.entries(obj)
	.reduce((acc, [key, value]) => set(value, key)(acc), {});

export const map = fn => arr => arr.map(fn);
export const reduce = (fn, init) => arr => arr.reduce(fn, init);

export const nth = index => array => array[index];

export const prop = prop => obj => obj[prop];

export const noDup = arr => Array.from(new Set(arr));

export const call = (...arg) => fn => fn(...arg);

export const isEmpty = obj => Object.keys(obj).length === 0;

export const assoc = (prop, value) => obj => ({...obj,  [prop]: value});

export const complement = fn => (...args) => !fn(...args);

export const thunk = (fn, ...args) => () => fn(...args);

export const ifElse = (bool, pass, fail) => (...args) => bool ? pass(...args) : fail(...args);
