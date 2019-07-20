'use strict';
const cheerio = require( 'cheerio' );
const diff = require( 'diff' );

const get_diff = ( original, updated ) => {
	let added = [],
		removed = [],
		dff = [];
	diff.diffWords( original, updated ).forEach( part => {
		let val = part.value;
		if ( part.added ) {
			added.push( val );
			val = `<ins>${val}</ins>`;
		} else if ( part.removed ) {
			removed.push( val );
			val = `<del>${val}</del>`;
		}
		dff.push( val );
	} );
	return {
		added: added.length,
		removed: removed.length,
		diff: added.length || removed.length ? dff.join( '' ) : ''
	};
};

const get_contents = html => {
	const $ = cheerio.load( html );
	return $( 'body' ).text();
};

module.exports.diff = ( original, updated ) => get_diff(
	get_contents( original ),
	get_contents( updated )
);
