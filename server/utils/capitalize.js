const whiteList = ['of', 'and'];

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const capitalizeAll = str => str
	.split(' ')
	.map(str => whiteList.includes(str) ? str : capitalize(str))
	.join(' ');

module.exports = {
	capitalize,
	capitalizeAll
};
