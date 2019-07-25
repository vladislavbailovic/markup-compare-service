'use strict';
const size = require( './diff/size' );
const resources = require( './diff/resources' );
const meta = require( './diff/meta' );
const content = require( './diff/content' );

const get_diff_object = ( diff ) => {
	const changed = diff.difflen ? diff.difflen : diff.added + diff.removed;
	const percentage = Math.ceil( ( changed / diff.original ) * 100 );
	
	return Object.assign( diff, {
		percentage: percentage || 0,
	} );
};

const get_size = ( original, updated ) => (
	{ size: get_diff_object( size.diff( original, updated ) ) }
);
const get_resources = ( original, updated ) => ( {
	scripts: get_diff_object( resources.scripts( original, updated ) ),
	links: get_diff_object( resources.links( original, updated ) ),
} );
const get_seo = ( original, updated ) => ( {
	title: get_diff_object( meta.title( original, updated ) ),
	description: get_diff_object( meta.description( original, updated ) ),
	ogtitle: get_diff_object( meta.ogtitle( original, updated ) ),
	ogdescription: get_diff_object( meta.ogdescription( original, updated ) ),
	ogimages: get_diff_object( meta.ogimages( original, updated ) ),
} );
const get_content = ( original, updated ) => (
	{ content: get_diff_object( content.diff( original, updated ) ) }
);

module.exports.all = ( original, updated ) => ( {
	size: get_size( original, updated ),
	resources: get_resources( original, updated ),
	seo: get_seo( original, updated ),
	content: get_content( original, updated ),
} );
