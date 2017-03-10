'use strict'
module.exports = png

const channels = require('./channels')
    , fill = require('./fill')

const packer = require( 'pngjs/lib/packer-sync.js' )
function png( data, options ) {
  data = channels( data, options )

  options = options || {}

  let width = parseInt( options.width ) || data.length
  let height = parseInt( options.height ) || Math.ceil( data.length / width )

  data = fill( data, width * height, options )
  data = data.map( ( c ) => c.toBuffer( 4 ) )
  data = Buffer.concat( data )
  data = {
    width,
    height,
    data
  }

  data = packer( data )
  return data
}
