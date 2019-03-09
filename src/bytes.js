'use strict'

var isBuffer = require('isbuffer')

module.exports = function bytes( data, options ) {
  if ( !isBuffer( data ) )
    data = require('./encoding')( data, options )

  options = require('./options')( options )
  var bytes = parseInt( options['bytes'] ) || 1

  var k = data.length / bytes
  var result = new Array()

  switch ( bytes ) {
    case 1:
      for ( var i = 0; i < k; i ++ )
        result[i] = data.readUInt8( i ) / 255.0
    break

    case 4:
      for ( var i = 0; i < k; i ++ )
        result[i] = data.readFloatBE( i * 4 )
    break

    default:
      throw new Error('Invalid bytes ${bytes}. Must be 1 (uint_8) or 4 (BE float)')
  }


  return result
}
