const tap = fn => arg => {
	fn(arg);
	return arg;
};

const clone = arr => [...arr];

const pairs = arr => {
	const newArr = [];
	for (let i = 0; i < arr.length; i += 2)
		newArr[newArr.length] = [arr[i], arr[i + 1]];
	return newArr;
};

const replaceAt = (index, item) => arr => {
	const newArr = clone(arr);
	newArr[index] = item;
	return newArr;
};

const splitEvery = num => arr => arr.length > 0 ?
	[arr.slice(0, num), ...splitEvery(num)(arr.slice(num))] : arr;

const flat = arr => arr.length > 0 ?
	[].concat(arr[0], flat(arr.slice(1))) : arr;

const reverse = arr => clone(arr).reverse();

const map = fn => arr => arr.map(fn);
const filter = fn => arr => arr.filter(fn);

const method = (name, ...args) => obj => obj[name](...args);

const asyncMap = fn => async arr => {
	const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		newArr[i] = await fn(arr[i]);
	}
	return newArr;
};

const flipObject = obj => Object.entries(obj)
	.reduce((acc, [key, value]) => ({...acc, [value]: key}), {});

const mapTo = arg => () => arg;

const prop = prop => obj => obj[prop];

const props = str => obj => str.split(',')
	.map(str => str.split('.'))
	.map(arr => arr.reduce((acc, str) => acc[str], obj));

const path = str => obj => str
	.split('.')
	.reduce((acc, str) => acc[str], obj);

const toObj = prop => value => ({[prop]: value});

const pick = str => obj => str.split(',')
	.map(str => str.split('.'))
	.reduce((acc, arr) => ({
		...acc, 
		[arr[arr.length - 1]]: arr.reduce((o, prop) => o[prop], obj)
	}), {});

const zip = arr1 => arr2 => arr1
	.map((v, i) => [v, arr2[i]]);

const zipWith = (fn, arr1) => arr2 => arr1
	.map((v, i) => fn(v, arr2[i]));

const adjust = (index, func) => arr => arr
	.map((v, i) => i === index ? func(v) : v);

const adjustProp = (prop, func) => obj => ({
	...obj,
	[prop]: func(obj[prop])
});

const pairBy = (arr1, prop1, prop2 = prop1) => arr2 => {
	if (arr2.length === 0 ) return [];
	const i = arr1.findIndex(v => v[prop1] === arr2[0][prop2]);
	return [
		[arr1[i], arr2[0]], 
		...pairBy(arr1, prop1, prop2)(arr2.slice(1))
	];
};

const applyTo = func => arr => func(...arr);

module.exports = {
	tap,
	adjust,
	adjustProp,
	applyTo,
	pairs,
	reverse,
	replaceAt,
	splitEvery,
	method,
	flat,
	map,
	filter,
	asyncMap,
	flipObject,
	mapTo,
	pairBy,
	prop,
	props,
	path,
	toObj,
	pick,
	zip,
	zipWith
};
