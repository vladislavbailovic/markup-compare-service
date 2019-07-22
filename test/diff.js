'use strict';

const tap = require( 'tap' );
const diff = require( '../src/diff' );

let actual = diff.all('', '');
tap.ok( actual.size.size );
tap.equals( actual.size.size.added, 0 );
tap.equals( actual.size.size.removed, 0 );

tap.ok( actual.resources.links );
tap.equals( actual.resources.links.added, 0 );
tap.equals( actual.resources.links.removed, 0 );

tap.ok( actual.resources.scripts );
tap.equals( actual.resources.scripts.added, 0 );
tap.equals( actual.resources.scripts.removed, 0 );

tap.ok( actual.seo.title );
tap.equals( actual.seo.title.added, 0 );
tap.equals( actual.seo.title.removed, 0 );

tap.ok( actual.seo.description );
tap.equals( actual.seo.description.added, 0 );
tap.equals( actual.seo.description.removed, 0 );

tap.ok( actual.seo.ogtitle );
tap.equals( actual.seo.ogtitle.added, 0 );
tap.equals( actual.seo.ogtitle.removed, 0 );

tap.ok( actual.seo.ogdescription );
tap.equals( actual.seo.ogdescription.added, 0 );
tap.equals( actual.seo.ogdescription.removed, 0 );

tap.ok( actual.seo.ogimages );
tap.equals( actual.seo.ogimages.added, 0 );
tap.equals( actual.seo.ogimages.removed, 0 );

tap.ok( actual.content.content );
tap.equals( actual.content.content.added, 0 );
tap.equals( actual.content.content.removed, 0 );


actual = diff.all('test', 'test1');
tap.ok( actual.size );
tap.equals( actual.size.size.added, 1 );
tap.equals( actual.size.size.removed, 0 );

tap.ok( actual.resources );
tap.equals( actual.resources.links.added, 0 );
tap.equals( actual.resources.links.removed, 0 );

tap.ok( actual.resources.scripts );
tap.equals( actual.resources.scripts.added, 0 );
tap.equals( actual.resources.scripts.removed, 0 );

tap.ok( actual.seo.title );
tap.equals( actual.seo.title.added, 0 );
tap.equals( actual.seo.title.removed, 0 );

tap.ok( actual.seo.description );
tap.equals( actual.seo.description.added, 0 );
tap.equals( actual.seo.description.removed, 0 );

tap.ok( actual.seo.ogtitle );
tap.equals( actual.seo.ogtitle.added, 0 );
tap.equals( actual.seo.ogtitle.removed, 0 );

tap.ok( actual.seo.ogdescription );
tap.equals( actual.seo.ogdescription.added, 0 );
tap.equals( actual.seo.ogdescription.removed, 0 );

tap.ok( actual.seo.ogimages );
tap.equals( actual.seo.ogimages.added, 0 );
tap.equals( actual.seo.ogimages.removed, 0 );

tap.ok( actual.content.content );
tap.equals( actual.content.content.added, 1 );
tap.equals( actual.content.content.removed, 1 );

