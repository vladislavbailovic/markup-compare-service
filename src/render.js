'use strict';

module.exports.html = ( name, changes ) => {
	const style = '* { font-family: monospace; } ins { text-decoration: none; background: green; } del { text-decoration: none; background: red; }';
	let changed = changes.difflen ? changes.difflen : changes.added + changes.removed;
	let percentage = ( changed / changes.original ) * 100;
	let meta = `+${changes.added} -${changes.removed} ( ${percentage}% significant )`;
	let html = `<div class="diff">${changes.diff}</div><div class="meta">${meta}</div>`;
	return `<h3>${name}</h3>${html}<style>${style}</style>`;
};
