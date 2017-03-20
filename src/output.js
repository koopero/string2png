'use strict'
var Promise = require('bluebird')
  , fs = Promise.promisifyAll( require('fs') )
  , mkdirp = Promise.promisify( require('mkdirp') )
  , path = require('path')

module.exports = function output( data, file, options ) {
  if ( !Buffer.isBuffer( data ) )
    data = require('./png')( data, options )

  var dir = path.dirname( file )
  return mkdirp( dir )
    .then( () => fs.writeFileAsync( file, data ) )
}
