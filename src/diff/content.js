'use strict';
const cheerio = require( 'cheerio' );

const util = require( '../util' );

const get_contents = html => {
	const $ = cheerio.load( html );
	return $( 'body' ).text();
};

module.exports.diff = ( original, updated ) => util.string_diff(
	get_contents( original ),
	get_contents( updated )
);
