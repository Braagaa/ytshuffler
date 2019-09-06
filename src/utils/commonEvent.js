export const toBool = (fn, bool) => e => fn(bool);
export const handleChecked = fn => e => fn({
	[e.target.name]: e.target.value
});
export const inverseBool = (fn, bool) => e => fn(!bool);
