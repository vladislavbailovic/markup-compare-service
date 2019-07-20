'use strict';

module.exports.diff = ( original, updated ) => {
	const size_diff = updated.length - original.length;
	const direction = size_diff > 0 ? '+' : '-';
	const type = size_diff > 0 ? 'ins' : 'del';
	const added = size_diff > 0 ? size_diff : 0;
	const removed = size_diff < 0 ? Math.abs( size_diff ) : 0;
	return {
		added: added,
		removed: removed,
		diff: `${original.length} <${type}>${direction}${Math.abs( size_diff )}</${type}>`
	};
};
