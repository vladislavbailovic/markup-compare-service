'use strict';
const cheerio = require( 'cheerio' );
const url = require( 'url' );
const diff = require( 'diff' );

const count_resources = ( html, selector, attr ) => {
	const $ = cheerio.load( html );
	
	let links = {};
	$( selector ).each( ( idx, el ) => {
		const link = $( el ).attr( attr );
		const lobj = url.parse( link );
		lobj.search = false;
		lobj.fragment = false;
		const clean = url.format( lobj );
		links[ clean ] = link;
	} );

	return links;
};

const array_diff = ( orig, upd ) => {
	let original = Object.keys( orig ),
		updated = Object.keys( upd ),
		added = [],
		removed = [],
		dff = [];
	original.sort();
	updated.sort();
	diff.diffArrays( original, updated ).forEach( part => {
		const add = part.added;
		const rmv = part.removed;
		part.value.forEach( val => {
			val = orig[ val ] || upd[ val ];
			if ( add ) {
				added.push( val );
				val = `<ins>${val}</ins>`;
			} else if ( rmv ) {
				removed.push( val )
				val = `<del>${val}</del>`;
			}
			dff.push( val );
		} );
	} );
	return {
		original: original.length,
		added: added.length,
		removed: removed.length,
		diff: dff.join( '<br />' )
	};
};

const resources_diff = ( original, updated, selector, attr ) => {
	const res1 = count_resources( original, selector, attr );
	const res2 = count_resources( updated, selector, attr );

	const item = {
		added: 0,
		removed: 0,
		diff: false
	};

	return Object.keys( res1 ).length === Object.keys( res2 ).length
		? item
		: array_diff( res1, res2 );
};

module.exports.links = ( original, updated ) => resources_diff( original, updated, 'link[rel="stylesheet"]', 'href' )
module.exports.scripts = ( original, updated ) => resources_diff( original, updated, 'script[src]', 'src' )
