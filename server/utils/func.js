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

module.exports = {
	tap,
	pairs,
	reverse,
	replaceAt,
	splitEvery,
	method,
	flat,
	map,
	asyncMap,
	flipObject,
	mapTo,
	prop
};
