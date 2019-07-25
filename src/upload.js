'use strict';
const aws = require( 'aws-sdk' );

const upload = async( bucket, buffer, name ) => {
	return new Promise( (resolve, reject) => {
		(async function() {
			const s3 = new aws.S3( { apiVersion: '2006-03-01' } );
			try {
				const { Location } = await s3.upload( {
					Bucket: bucket,
					Key: name,
					Body: buffer,
					ACL: 'public-read'
				} ).promise();
				resolve( Location );
			} catch ( error ) {
				reject( error );
			}
		})();
	});
};

const list = async( bucket, prefix ) => {
	return new Promise( (resolve, reject) => {
		(async function() {
			let urls = {};
			const s3 = new aws.S3( { apiVersion: '2006-03-01' } );
			try {
				const { Contents } = await s3.listObjects( {
					Bucket: bucket,
					Prefix: prefix,
					EncodingType: 'url'
				} ).promise();

				Contents.forEach( content => {
					const parts = content.Key.split('/');
					const size = parts.pop().split('.')[0];
					urls[ size ] = `https://${bucket}.s3.amazonaws.com/${content.Key}`;
				} );
				resolve( urls );
			} catch ( error ) {
				reject( error );
			}
		})();
	});
};

const get = async( bucket, filename ) => {
	return new Promise( (resolve, reject) => {
		(async function() {
			const s3 = new aws.S3( { apiVersion: '2006-03-01' } );
			try {
				const { Body } = await s3.getObject( {
					Bucket: bucket,
					Key: filename,
				} ).promise();
				resolve( Body );
			} catch ( error ) {
				reject( error );
			}
		})();
	});
};

exports.bucket = bucket => {
	return {
		upload: ( buffer, name ) => upload( bucket, buffer, name ),
		list: prefix => list( bucket, prefix ),
		get: filename => get( bucket, filename )
	};
};
