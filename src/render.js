'use strict';

module.exports.html = ( name, changes ) => {
	let changed = changes.difflen ? changes.difflen : changes.added + changes.removed;
	let percentage = Math.ceil( ( changed / changes.original ) * 100 );
	if ( 0 === percentage ) return '';

	let meta = `+${changes.added} -${changes.removed} ( ${percentage}% )`;
	let diff = changes.diff;
	if ( percentage > 25 && diff.length > 300 ) {
		diff = '<i>&lt;abbreviated&gt;</i>';
	}
	const style = '* { font-family: monospace; } ins { text-decoration: none; background: green; } del { text-decoration: none; background: red; }';
	let html = `<div class="diff">${diff}</div><div class="meta">${meta}</div>`;
	return `<h3>${name}</h3>${html}<style>${style}</style>`;
};
