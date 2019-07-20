'use strict';

module.exports.html = ( name, changes ) => {
	const style = '* { font-family: monospace; } ins { text-decoration: none; background: green; } del { text-decoration: none; background: red; }';
	let meta = `+${changes.added} -${changes.removed}`;
	let html = `<div class="diff">${changes.diff}</div><div class="meta">${meta}</div>`;
	return `<h3>${name}</h3>${html}<style>${style}</style>`;
};
