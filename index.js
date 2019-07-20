'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const browser = require( './src/browser' );
const diff = require( './src/diff' );
const render = require( './src/render' );

const read = async relpath => new Promise( ( resolve, reject ) => {
	fs.readFile( path.join( __dirname, relpath ), ( err, data ) => {
		if ( err ) return reject( err );
		resolve( data );
	} );
} );

const write = async ( relpath, data ) => new Promise( ( resolve, reject ) => {
	fs.writeFile( path.join( __dirname, relpath ), data, err => {
		return err
			? reject( err )
			: resolve();
	} );
} );

(async () => {
	const html1 = await read( 'test/data/original.html' );
	const html2 = await read( 'test/data/compare.html' );
	//const html2 = await browser.get_page( 'http://premium.wpmudev.org' );
	//
	const result = diff.quick( html1, html2 );
	console.dir( result, { depth: 6 });
	let dff = [];
	Object.keys( result ).forEach( key => {
		dff.push( render.html( key, result[ key ] ) );
	} );
	write( 'test/data/out.html', dff.join( '<hr/>' ) );
	
})();

// https://github.com/kpdecker/jsdiff
// ^ use this to diff the page
//
// Also diff:
// 	- Page resources:
// 		- scripts
// 		- links
// 	- Page meta:
// 		- title
// 		- description
// 		- og data?
// 		- H1?
// 		- Use puppeteer to render screenshots of colored diffs
// 	- Overall page diff %:
// 		- % added
// 		- % removed
// 		- % diff overall
// 		- calc these for:
// 			- all markup, char by char
// 			- body element rendered text, word by word
