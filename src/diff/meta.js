'use strict';
const cheerio = require( 'cheerio' );

const util = require( '../util' );

const get_tag_contents = ( tag, html ) => {
	const $ = cheerio.load( html );
	return $( tag ).text() || '';
};

const get_tag_attr = ( tag, attr, html ) => {
	const $ = cheerio.load( html );
	return $( tag ).attr( attr ) || '';
};

const get_tags_attr = ( tag, attr, html ) => {
	const $ = cheerio.load( html );
	let attrs = {};
	$( tag ).each( ( idx, tag ) => {
		const key = Math.random();
		attrs[ key ] = $( tag ) .attr( attr ) || '';
	} );
	return attrs;
};

module.exports.title = ( original, updated ) => util.string_diff( 
	get_tag_contents( 'title', original ),
	get_tag_contents( 'title', updated )
);
module.exports.description = ( original, updated ) => util.string_diff(
	get_tag_attr( 'meta[name="description"]', 'content', original ),
	get_tag_attr( 'meta[name="description"]', 'content', updated )
);
module.exports.ogtitle = ( original, updated ) => util.string_diff(
	get_tag_attr( 'meta[property="og:title"]', 'content', original ),
	get_tag_attr( 'meta[property="og:title"]', 'content', updated )
);
module.exports.ogdescription = ( original, updated ) => util.string_diff(
	get_tag_attr( 'meta[property="og:description"]', 'content', original ),
	get_tag_attr( 'meta[property="og:description"]', 'content', updated )
);
module.exports.ogimages = ( original, updated ) => util.array_diff(
	get_tags_attr( 'meta[property="og:image"]', 'content', original ),
	get_tags_attr( 'meta[property="og:image"]', 'content', updated )
);
