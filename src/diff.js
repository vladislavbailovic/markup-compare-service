'use strict';
const cheerio = require( 'cheerio' );
const url = require( 'url' );
const diff = require( 'diff' );

const count_resources = html => {
	const $ = cheerio.load( html );
	
	let links = [],
		link_roots = [];
	$( 'link[rel="stylesheet"]' ).each( ( idx, el ) => {
		const link = $( el ).attr( 'href' );
		const lobj = url.parse( link );
		lobj.search = false;
		lobj.fragment = false;
		const clean = url.format( lobj );
		links.push( link );
		link_roots.push( clean );
	} );

	let srcs = [],
		srcs_roots = [];
	$( 'script[src]' ).each( ( idx, el ) => {
		const link = $( el ).attr( 'src' );
		const lobj = url.parse( link );
		lobj.search = false;
		lobj.fragment = false;
		const clean = url.format( lobj );
		srcs.push( link );
		srcs_roots.push( clean );
	} );

	return {
		links: { raw: links, clean: link_roots },
		scripts: { raw: srcs, clean: srcs_roots }
	};
};

const array_diff = ( original, updated ) => {
	let added = [],
		removed = [];
	console.log( 'Diffing', original.length, 'vs', updated.length );
	diff.diffArrays( original, updated ).forEach( part => {
		const add = !!part.added;
		const rmv = !!part.removed;
		part.value.forEach( val => {
			if ( add ) added.push( val );
			if ( rmv ) removed.push( val );
		} );
	} );
	return {
		added: added,
		removed: removed,
		diff: {
			'+': added.length,
			'-': removed.length,
		}
	};
};

const resources_diff = ( original, updated ) => {
	const res1 = count_resources( original );
	const res2 = count_resources( updated );

	return {
		original: res1,
		updated: res2,
		diff: {
			links: {
				raw: array_diff( res1.links.raw, res2.links.raw),
				clean: array_diff( res1.links.clean, res2.links.clean),
			},
			scripts: {
				raw: array_diff( res1.scripts.raw, res2.scripts.raw),
				clean: array_diff( res1.scripts.clean, res2.scripts.clean),
			}
		}
	};
};

const size_diff = ( original, updated ) => {
	const size_diff = updated.length - original.length;
	const direction = size_diff > 0 ? '+' : '-';
	return {
		original: original.length,
		updated: updated.length,
		diff: `${direction}${size_diff}`
	};
};

module.exports.quick = ( original, updated ) => {
	return {
		size: size_diff( original, updated ),
		resources: resources_diff( original, updated )
	};
};
