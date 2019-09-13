import {getOffset} from './math';

export const toBool = (fn, bool) => e => fn(bool);
export const handleChecked = fn => e => fn({
	[e.target.name]: e.target.value
});
export const inverseBool = (fn, bool) => e => fn(!bool);
export const valueChange = fn => e => fn(e.target.value);
export const setState = (fn, arg) => () => fn(arg);

export const prevPage = (itemsPerPage, page) => fn => e => {
	if (getOffset(itemsPerPage, page) > 0) {
		return fn(page - 1);
	}
};
export const nextPage = (itemsPerPage, page, maximumItems) => fn => e => {
	if (getOffset(itemsPerPage, page) < maximumItems - itemsPerPage) {
		return fn(page + 1);
	}
};
