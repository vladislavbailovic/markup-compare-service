'use strict';
const diff = require( 'diff' );

module.exports.array_diff = ( orig, upd ) => {
	let original = Object.keys( orig ),
		updated = Object.keys( upd ),
		added = [],
		removed = [],
		dff = [];
	original.sort();
	updated.sort();
	diff.diffArrays( original, updated ).forEach( part => {
		const add = part.added;
		const rmv = part.removed;
		part.value.forEach( val => {
			val = upd[ val ] || orig[ val ];
			if ( add ) {
				added.push( val );
				val = `<ins>${val}</ins>`;
			} else if ( rmv ) {
				removed.push( val )
				val = `<del>${val}</del>`;
			}
			dff.push( val );
		} );
	} );
	return {
		original: original.length,
		added: added.length,
		removed: removed.length,
		diff: dff.join( '<br />' )
	};
};

module.exports.string_diff = ( original, updated ) => {
	let added = [],
		removed = [],
		origlen = original.split( /\s+/ ).length,
		dff = [];
	diff.diffWords( original, updated ).forEach( part => {
		let val = part.value;
		if ( part.added ) {
			added.push( val );
			val = `<ins>${val}</ins>`;
		} else if ( part.removed ) {
			removed.push( val );
			val = `<del>${val}</del>`;
		}
		dff.push( val );
	} );
	return {
		original: origlen,
		added: added.length,
		removed: removed.length,
		diff: added.length || removed.length ? dff.join( '' ) : ''
	};
};
