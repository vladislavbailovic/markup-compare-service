'use strict';

const browser = require( './src/browser' );

const html = browser.get_page( 'http://premium.wpmudev.org' ).then( html => console.log(html) );
