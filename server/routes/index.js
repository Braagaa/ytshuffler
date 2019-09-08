const {basename, join} = require('path');
const {readdirSync} = require('fs');

const filename = basename(__filename);

const routes = readdirSync(__dirname)
	.filter(route => route.endsWith('.js') && route !== filename)
	.map(route => route.replace('.js', ''))
	.map(route => ({[route]: require(join(__dirname, route))}))
	.reduce((acc, obj) => ({...acc, ...obj}), {});

module.exports = routes;
