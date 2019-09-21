const createUrl = (base, paths) => [base]
	.concat(paths)
	.reduce((acc, path, i) => i === 0 ? 
		({base: path}) : ({[path]: `${base}${path}/`})
	);

export const youtubeURL = createUrl('https://www.youtube.com/', ['channel']);
