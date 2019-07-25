'use strict';
const cheerio = require( 'cheerio' );
const url = require( 'url' );

const util = require( '../util' );

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

const resources_diff = ( original, updated, selector, attr ) => {
	const res1 = count_resources( original, selector, attr );
	const res2 = count_resources( updated, selector, attr );

	const item = {
		original: Object.keys( res1 ).length,
		added: 0,
		removed: 0,
		diff: false
	};

	return Object.keys( res1 ).length === Object.keys( res2 ).length
		? item
		: util.array_diff( res1, res2 );
};

module.exports.links = ( original, updated ) => resources_diff( original, updated, 'link[rel="stylesheet"]', 'href' );
module.exports.scripts = ( original, updated ) => resources_diff( original, updated, 'script[src]', 'src' );
