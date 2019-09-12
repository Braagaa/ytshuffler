const {readFileSync} = require('fs');
const {join} = require('path');
const {pairs, reverse, replaceAt} = require('../utils/func');
const {capitalizeAll} = require('../utils/capitalize');

let data;

try {
	data = readFileSync(join(__dirname, 'music-topic-ids.txt'), 'utf-8')
		.split(/[\n\r]/)
		.filter(line => line)
		.map(capitalizeAll);

	data = pairs(replaceAt(1, 'Music')(data))
		.map(reverse)
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {});
} catch (e) {
	console.error(e.message);
}

module.exports = data;
