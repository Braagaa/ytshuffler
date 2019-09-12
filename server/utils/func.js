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

const reverse = arr => clone(arr).reverse();

module.exports = {
	tap,
	pairs,
	reverse,
	replaceAt
};
