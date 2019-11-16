export const randomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNth = (arr) => 
	arr[randomInt(0, arr.length - 1)];
