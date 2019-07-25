'use strict';

const sizedesc = 'It is normal to have <i>some</i> discrepancies here, but having too large homepage overall size difference might indicate something went wrong with your update';
const resourcedesc = 'These affect how your homepage looks and functions. Changes here might indicate that something went wrong with your update. Please, <i>note</i>: some of these changes might also come from cache-busting techniques used by your site or other external sites you use resources from. We do our best to recognize these, but some of the changes reported here might still be caused by this. Please, inspect the list to ensure everything is in order';
const seodesc = 'Changes in this section directly affect how your site will be perceived by the search engines. Ideally, there should be no differences here unless you added them yourself.';
const content = 'We also check the plain text body copy differences of your home page. Depending on the type of your site and frequency of homepage content changes, some discrepancies here might be normal';
module.exports = {
	section: {
		title: {
			size: 'Homepage size',
			resources: 'Resources',
			seo: 'SEO',
			content: 'Content',
		},
		desc: {
			seo: seodesc,
			resources: resourcedesc,
		}
	},
	title: {
		size: 'Size',
		links: 'Stylesheet links',
		scripts: 'External scripts',
		title: 'Page title',
		description: 'Page description',
		ogtitle: 'OpenGraph: title',
		ogdescription: 'OpenGraph: description',
		ogimages: 'OpenGraph: images',
		content: 'Plain text body copy',
	},
	description: {
		size: sizedesc,
		links: 'These are your stylesheet links that got changed between updates - these affect how your homepage looks like',
		scripts: 'These are your external javascript files that got changed between updates',
		title: 'These changes affect how your site will appear in search results',
		description: 'These changes affect how your site will be ranked in searches',
		ogtitle: 'These changes affect how your homepage will look on social sites',
		ogdescription: 'These changes affect how your homepage will be described as on social sites',
		ogimages: 'These changes affect what your homepage will use as image on social sites',
		content: content,
	}
};
