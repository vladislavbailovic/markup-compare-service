'use strict';
const cheerio = require( 'cheerio' );
const url = require( 'url' );
const diff = require( 'diff' );

const size = require( './diff/size' );
const resources = require( './diff/resources' );
const meta = require( './diff/meta' );

module.exports.quick = ( original, updated ) => {
	return {
		size: size.diff( original, updated ),
		links: resources.links( original, updated ),
		scripts: resources.scripts( original, updated ),
		title: meta.title( original, updated )
	};
};
