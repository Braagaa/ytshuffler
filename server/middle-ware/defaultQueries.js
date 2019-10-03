module.exports = (type, defaults) => (req, res, next) => { 
	Object.entries(defaults)
		.forEach(([key, value]) => {
			if (!req[type][key]) {
				req[type][key] = value;
			}
		});
	next();
};
