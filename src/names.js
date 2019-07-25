'use strict';
const crypto = require( 'crypto' );
const uuidv4 = require( 'uuid/v4' );

const from_url = url => {
	return crypto
		.createHash( 'md5' )
		.update( url )
		.digest('hex');
};

const get_remote_filename = ( url, variation, is_diff ) => {
	variation = variation || 'original';
	return get_remote_path( url, `${variation}.html`, is_diff );
};

const get_remote_path = ( url, filename, is_diff ) => {
	filename = filename || '';
	const hash = from_url( url );
	const uuid = this.uuid || uuidv4();
	return is_diff
		? `diffs/${hash}/${uuid}/${filename}`
		: `originals/${hash}/${filename}`;
};

const create_new_diffset = () => this.uuid = uuidv4();

exports.remote = get_remote_filename;
exports.path = get_remote_path;

exports.diff = ( url, variation ) => get_remote_filename( url, variation, true );
exports.new_diffset = create_new_diffset;
