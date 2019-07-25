'use strict';

const puppeteer = require( 'puppeteer-core' );

const get_page = async url => {
	const browser = await puppeteer.launch({
		headless: true,
		executablePath: '/opt/headless_shell',
		args: [ '--no-sandbox', '--disable-gpu', '--single-process', '--no-zygote' ],
	});
	const page = await browser.newPage();
	await page.goto( url, { waitUntil: 'networkidle2' } );
	const html = await page.evaluate('new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML');
	browser.close();

	return html;
};

exports.get_page = get_page;
