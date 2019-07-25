'use strict';

const tap = require( 'tap' );

const fs = require( 'fs' );
const path = require( 'path' );

const diff = require( '../src/diff' );

const read = async relpath => new Promise( ( resolve, reject ) => {
	fs.readFile( path.join( __dirname, relpath ), ( err, data ) => {
		if ( err ) return reject( err );
		resolve( data );
	} );
} );
const get_result = async () => {
	const html1 = await read( 'data/original.html' );
	const html2 = await read( 'data/compare.html' );
	return diff.all( html1, html2 );
}

tap.test( 'size comparison', async t => {
	const result = await get_result();
	t.equals(
		result.size.size.added,
		450
	);
	t.end();
} );

tap.test( 'resources comparison', async t => {
	const result = await get_result();
	t.equals(
		result.resources.links.added,
		1,
		'links difference check'
	);
	t.equals(
		result.resources.scripts.added,
		3,
		'scripts difference check'
	);
	t.end();
} );

tap.test( 'seo comparison', async t => {
	const result = await get_result();
	t.equals(
		result.seo.title.percentage,
		0,
		'title difference check'
	);
	t.equals(
		result.seo.description.added,
		2,
		'description difference check'
	);
	// ...
	t.end();
} );
