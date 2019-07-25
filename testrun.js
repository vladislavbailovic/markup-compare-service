'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const diff = require( './src/diff' );

const read = async relpath => new Promise( ( resolve, reject ) => {
	fs.readFile( path.join( __dirname, relpath ), ( err, data ) => {
		if ( err ) return reject( err );
		resolve( data );
	} );
} );

(async () => {
	const html1 = await read( 'test/data/original.html' );
	const html2 = await read( 'test/data/compare.html' );
	const result = diff.all( html1, html2 );
	console.log( JSON.stringify( result, 6 ) );
})();
