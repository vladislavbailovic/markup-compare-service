'use strict';

const tap = require( 'tap' );
const size = require( '../src/diff/size' );

let actual = size.diff( 'test', 'test' );
tap.equals(
	actual.original,
	'test'.length
);
tap.equals( actual.added, 0 );
tap.equals( actual.removed, 0 );

actual = size.diff( 'test', 'test1' );
tap.equals(
	actual.original,
	'test'.length
);
tap.equals( actual.added, 1 );
tap.equals( actual.removed, 0 );

actual = size.diff( 'test1', 'test' );
tap.equals(
	actual.original,
	'test1'.length
);
tap.equals( actual.added, 0 );
tap.equals( actual.removed, 1 );
