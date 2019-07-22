'use strict';
const strings = require( './strings' );

const fragment = ( name, changes ) => {
	if ( ! changes.diff ) return '';
	if ( ! changes.percentage ) return '';

	let title = strings.title[ name ] || name;

	let description = strings.description[ name ] || '';
	description = description ? `<p>${description}</p>` : '';

	let meta = `+${changes.added} -${changes.removed} ( ${changes.percentage}% )`;
	let diff = changes.diff;
	if ( changes.percentage > 25 && diff.length > 500 ) {
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

const section = ( name, items ) => {
	console.log( name, items );
	let dff = [];
	const sect = strings.section || {};
	Object.keys( items ).forEach( key => {
		dff.push( fragment( key, items[ key ] ) );
	} );
	return `<section id="${name}">
		<header>
			<h2>${ ( sect.title || {} )[ name ] || name }</h2>
			<p>${ ( sect.desc || {} )[ name ] || '' }</h2>
		</header>` + dff.join( '' ) + '</section>';
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
	Object.keys( diffs ).forEach( sect => {
		dff.push( section( sect, diffs[ sect ] ) );
	} );
	return '<main>' + dff.join( '' ) + '</main>' + style();
};
