'use strict';
const strings = require( './strings' );

const fragment = ( name, changes ) => {
	let title = strings.title[ name ] || name;

	let description = strings.description[ name ] || '';
	description = !!description ? `<p>${description}</p>` : '';

	let changed = changes.difflen ? changes.difflen : changes.added + changes.removed;
	let percentage = Math.ceil( ( changed / changes.original ) * 100 );
	if ( 0 === percentage ) return '';

	let meta = `+${changes.added} -${changes.removed} ( ${percentage}% )`;
	let diff = changes.diff;
	if ( percentage > 25 && diff.length > 500 ) {
		diff = '<i>&lt;abbreviated&gt;</i>';
	}
	let html = `<div class="diff">${diff}</div><footer class="meta"><p>${meta}</p></footer>`;
	return `<article>
			<header>
				<h3>${title}</h3>
				${description}
			</header>
			${html}
		</article>`;
};

const style = () => {
	return `<style>
.diff { font-family: monospace; overflow-x: scroll }
section { max-width: 950px; margin: 10px auto }
ins { text-decoration: none; background: #76EEC6; }
del { text-decoration: none; background: #FF82AB; }
	</style>`;
};

module.exports.html = diffs => {
	let dff = [];
	Object.keys( diffs ).forEach( key => {
		dff.push( fragment( key, diffs[ key ] ) );
	} );
	return '<section>' + dff.join( '' ) + '</section>' + style();
};
