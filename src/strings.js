'use strict';

const sizedesc = 'It is normal to have <i>some</i> discrepancies here, but having too large homepage overall size difference might indicate something went wrong with your update';
const resourcedesc = 'These affect how your homepage looks and functions. Changes here might indicate that something went wrong with your update. Please, <i>note</i>: some of these changes might also come from cache-busting techniques used by your site or other external sites you use resources from. We do our best to recognize these, but some of the changes reported here might still be caused by this. Please, inspect the list to ensure everything is in order';
const seodesc = 'Changes in this section directly affect how your site will be perceived by the search engines. Ideally, there should be no differences here unless you added them yourself.';
const ogdesc = seodesc.replace( /search engines/, 'search engines and social media sites' );
const content = 'We also check the plain text body copy differences of your home page. Depending on the type of your site and frequency of homepage content changes, some discrepancies here might be normal';
module.exports = {
	title: {
		size: 'Size',
		links: 'Resources: stylesheet links',
		scripts: 'Resources: external scripts',
		title: 'SEO: page title',
		description: 'SEO: page description',
		ogtitle: 'OpenGraph: title',
		ogdescription: 'OpenGraph: description',
		ogimages: 'OpenGraph: images',
		content: 'Content: plain text body copy',
	},
	description: {
		size: sizedesc,
		links: resourcedesc,
		scripts: resourcedesc,
		title: seodesc,
		description: seodesc,
		ogtitle: ogdesc,
		ogdescription: ogdesc,
		ogimages: ogdesc,
		content: content,
	}
};
