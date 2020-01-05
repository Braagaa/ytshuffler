export const channelDateFormat = UTFString => {
	const [, month, numberDay, year] = new Date(UTFString)
		.toDateString()
		.split(' ');

	return `${parseInt(numberDay)} ${month} ${year}`;
};
