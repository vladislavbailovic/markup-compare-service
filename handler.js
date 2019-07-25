'use strict';

const browser = require( './src/browser' );
const diff = require( './src/diff' );
const render = require( './src/render' );

const upload = require( './src/upload' );
const names = require( './src/names' );
const respond_with = require( './src/response' );
const params = require( './src/params' );

module.exports.original = async ( event ) => {
	const url = params.url( event );

	if ( ! url ) {
		return respond_with.error(
			422,
			'validating url',
			params.raw( event )
		);
	}

	let response = {
		original: '',
	};
	let page;

	try {
		page = await browser.get_page( url );
	} catch( error ) {
		return respond_with.error(
			500,
			'loading chromium',
			error
		);
	}

	const bucket = upload.bucket( event.stageVariables.bucketName );
	try {
		response.original = await bucket.upload(
			page,
			names.remote( url )
		);
	} catch ( error ) {
		return respond_with.error(
			500,
			'uploading original page markup to S3',
			error
		);
	}

	return respond_with.success( response );
};

module.exports.list = async ( event ) => {
	const url = params.url( event );

	if ( ! url ) {
		return respond_with.error(
			422,
			'validating url',
			params.raw( event )
		);
	}
	const bucket = upload.bucket( event.stageVariables.bucketName );
	let response = {};

	try {
		response = await bucket.list( names.path( url ) );
	} catch ( error ) {
		return respond_with.error( 500, 'retrieving urls', error );
	}

	return respond_with.success( response );
};

module.exports.compare = async ( event ) => {
	const url = params.url( event );

	if ( ! url ) {
		return respond_with.error(
			422,
			'validating url',
			params.raw( event )
		);
	}
	const bucket = upload.bucket( event.stageVariables.bucketName );
	let response = {
		diff: {}
	};

	let buffer;
	try {
		buffer = await bucket.get( names.remote( url ) );
	} catch ( error ) {
		return respond_with.error( 500, 'retrieving original page markup', error );
	}

	let page;
	try {
		page = await browser.get_page( url );
	} catch( error ) {
		return respond_with.error(
			500,
			'getting updated page markup',
			error
		);
	}

	names.new_diffset();

	try {
		response.url = await bucket.upload(
			page,
			names.diff( url )
		);
	} catch ( error ) {
		return respond_with.error(
			500,
			'uploading updated markup to S3',
			error
		);
	}

	response.diff = diff.all( buffer, page );
	response.html = render.html( response.diff );

	return respond_with.success( response );
};

module.exports.demo = async ( event ) => {
	const url = params.url( event );

	if ( ! url ) {
		return respond_with.error(
			422,
			'validating url',
			params.raw( event )
		);
	}
	const bucket = upload.bucket( event.stageVariables.bucketName );

	let buffer;
	try {
		buffer = await bucket.get( names.remote( url ) );
	} catch ( error ) {
		return respond_with.error( 500, 'retrieving original page markup', error );
	}

	let page;
	try {
		page = await browser.get_page( url );
	} catch( error ) {
		return respond_with.error(
			500,
			'getting updated page markup',
			error
		);
	}

	const dff = diff.all( buffer, page );
	return respond_with.html( render.html( dff ) );
};
