import {call} from './func';

const test = regEx => str => regEx.test(str);

export const properLength = (min, max) => str => 
	str.length >= min && str.length <= max;
export const checkUpperCase = test(/([A-Z])/);
export const checkLowerCase = test(/[a-z]/);
export const checkSpecialChar = test(/\W/);
export const checkNumber = test(/\d/);
export const checkLength = properLength(8, 20);

const passwordValidations = [
	properLength,
	checkUpperCase,
	checkLowerCase,
	checkSpecialChar,
	checkNumber
];

export const fullPasswordCheck = password => 
	passwordValidations.every(call(password));
