'use strict'
module.exports = png

var channels = require('./channels')
  , fill = require('./fill')
  , packer = require( 'pngjs/lib/packer-sync.js' )

function png( data, options ) {
  data = channels( data, options )

  options = options || {}

  var width = parseInt( options.width )
  if ( !width )
    width = options.square ? Math.floor( Math.sqrt( data.length ) ) : data.length
  var height = parseInt( options.height ) || Math.floor( data.length / width )

  data = fill( data, width * height, options )
  data = data.map( function ( c ) { return c.toBuffer( 4 ) } )
  data = Buffer.concat( data )
  data = {
    width:width,
    height:height,
    data:data
  }

  data = packer( data )
  return data
}
