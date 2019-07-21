'use strict';

const tap = require( 'tap' );
const diff = require( '../src/diff' );

let actual = diff.quick('', '');
tap.ok( actual.size );
tap.equals( actual.size.added, 0 );
tap.equals( actual.size.removed, 0 );

tap.ok( actual.links );
tap.equals( actual.links.added, 0 );
tap.equals( actual.links.removed, 0 );

tap.ok( actual.scripts );
tap.equals( actual.scripts.added, 0 );
tap.equals( actual.scripts.removed, 0 );

tap.ok( actual.title );
tap.equals( actual.title.added, 0 );
tap.equals( actual.title.removed, 0 );

tap.ok( actual.description );
tap.equals( actual.description.added, 0 );
tap.equals( actual.description.removed, 0 );

tap.ok( actual.ogtitle );
tap.equals( actual.ogtitle.added, 0 );
tap.equals( actual.ogtitle.removed, 0 );

tap.ok( actual.ogdescription );
tap.equals( actual.ogdescription.added, 0 );
tap.equals( actual.ogdescription.removed, 0 );

tap.ok( actual.ogimages );
tap.equals( actual.ogimages.added, 0 );
tap.equals( actual.ogimages.removed, 0 );

tap.ok( actual.content );
tap.equals( actual.content.added, 0 );
tap.equals( actual.content.removed, 0 );


actual = diff.quick('test', 'test1');
tap.ok( actual.size );
tap.equals( actual.size.added, 1 );
tap.equals( actual.size.removed, 0 );

tap.ok( actual.links );
tap.equals( actual.links.added, 1 );
tap.equals( actual.links.removed, 0 );

tap.ok( actual.scripts );
tap.equals( actual.scripts.added, 1 );
tap.equals( actual.scripts.removed, 0 );

tap.ok( actual.title );
tap.equals( actual.title.added, 1 );
tap.equals( actual.title.removed, 0 );

tap.ok( actual.description );
tap.equals( actual.description.added, 1 );
tap.equals( actual.description.removed, 0 );

tap.ok( actual.ogtitle );
tap.equals( actual.ogtitle.added, 1 );
tap.equals( actual.ogtitle.removed, 0 );

tap.ok( actual.ogdescription );
tap.equals( actual.ogdescription.added, 1 );
tap.equals( actual.ogdescription.removed, 0 );

tap.ok( actual.ogimages );
tap.equals( actual.ogimages.added, 1 );
tap.equals( actual.ogimages.removed, 0 );

tap.ok( actual.content );
tap.equals( actual.content.added, 1 );
tap.equals( actual.content.removed, 0 );

