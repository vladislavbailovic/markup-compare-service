'use strict';

module.exports.html = ( name, html ) => {
	const style = '* { font-family: monospace; } ins { text-decoration: none; background: green; } del { text-decoration: none; background: red; }';
	return `<h3>${name}</h3>${html}<style>${style}</style>`;
};
