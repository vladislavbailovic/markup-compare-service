'use strict';

exports.error = ( code, message, error ) => {
	console.error(
		`Error ${message}:`,
		error
	);
	return {
		statusCode: code,
		body: JSON.stringify( { message: `Error ${message} ${error}` } )
	};
};

exports.warning = ( message, response, error ) => {
	console.warn(
		`Non-breaking error ${message}:`,
		error
	);
	return {
		statusCode: 200,
		body: JSON.stringify( response )
	};
};

exports.success = response => {
	console.log( '--- All good ---' );
	return {
		statusCode: 200,
		body: JSON.stringify( response )
	};
};

exports.html = response => ( {
	statusCode: 200,
	headers: { 'Content-Type': 'text/html; charset: utf-8' },
	body: response,
} );
