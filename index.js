'use strict';

const browser = require( './src/browser' );

const html = browser.get_page( 'http://premium.wpmudev.org' ).then( html => console.log(html) );

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
