'use strict';

const valid = require('valid-url');

const get_url = object => valid.isUri( get_raw_url( object ) ) ? get_raw_url( object ) : false;
const get_raw_url = object => ( ( object || {} ).queryStringParameters || {} ).url || false;

exports.url = get_url;
exports.raw = get_raw_url;
