'use strict';
const cheerio = require( 'cheerio' );
const diff = require( 'diff' );

const get_diff = ( original, updated ) => {
	let added = [],
		removed = [],
		difflen = original.split( /\s+/ ).length,
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
		original: difflen,
		added: added.length,
		removed: removed.length,
		diff: added.length || removed.length ? dff.join( '' ) : ''
	};
};

const get_tag_contents = ( tag, html ) => {
	const $ = cheerio.load( html );
	return $( tag ).text();
};

const get_tag_attr = ( tag, attr, html ) => {
	const $ = cheerio.load( html );
	return $( tag ).attr( attr );
};

module.exports.title = ( original, updated ) => get_diff( 
	get_tag_contents( 'title', original ),
	get_tag_contents( 'title', updated )
);
module.exports.description = ( original, updated ) => get_diff(
	get_tag_attr( 'meta[name="description"]', 'content', original ),
	get_tag_attr( 'meta[name="description"]', 'content', updated )
);
