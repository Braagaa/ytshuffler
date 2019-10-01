const {basename, join} = require('path');
const {readdirSync} = require('fs');

module.exports = function(dirname, filename) {
	filename = basename(filename);

	return routes = readdirSync(dirname)
		.filter(route => route.endsWith('.js') && route !== filename)
		.map(route => route.replace('.js', ''))
		.map(route => ({[route]: require(join(dirname, route))}))
		.reduce((acc, obj) => ({...acc, ...obj}), {});
}
