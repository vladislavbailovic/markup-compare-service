'use strict';

const quick_diff = ( original, updated ) => {
	const size_diff = updated.length - original.length;
	const direction = size_diff > 0 ? '+' : '-';
	return {
		size: {
			original: original.length,
			updated: updated.length,
			diff: `${direction}${size_diff}`
		}
	};
};

module.exports.quick = quick_diff;
