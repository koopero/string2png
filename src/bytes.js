'use strict'

module.exports = function bytes( data, options ) {
  if ( !Buffer.isBuffer( data ) )
    data = require('./encoding')( data, options )

  options = options || {}
  var bytes = parseInt( options['bytes'] ) || 1

  let k = data.length / bytes
  let result = new Array()

  switch ( bytes ) {
    case 1:
      for ( let i = 0; i < k; i ++ )
        result[i] = data.readUInt8( i ) / 255.0
    break

    case 4:
      for ( let i = 0; i < k; i ++ )
        result[i] = data.readFloatBE( i * 4 )
    break

    default:
      throw new Error('Invalid bytes ${bytes}. Must be 1 (uint_8) or 4 (BE float)')
  }


  return result
}
