'use strict'
module.exports = decode

const bufferFrom = require('buffer-from')

const DIVISOR = {
  float: 1,
  percent: 100,
  dec: 255
}

function decode( data, options ) {
  if ( Buffer.isBuffer( data ) )
    return data

  options = options || {}

  let encoding = options.encoding || 'hex'

  switch( encoding ) {
    case 'hex':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
      if ( data.length & 1 )
        data = data.substr(0,data.length-1)
      return bufferFrom( data, encoding )
    break

    case 'hex2':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
      data = data.split('').map( v=>v+v ).join('')
      encoding = 'hex'
      return bufferFrom( data, encoding )
    break

    case 'float':
    case 'percent':
    case 'dec':
      let divisor = DIVISOR[encoding]
      data = allNumbers( data )
      data = data.map( ( v ) => v / divisor )

      if ( options.bytes && options.bytes !== 4 )
        throw new Error(`Invalid bytes for encoding ${encoding} ( must be 4 )`)

      options.bytes = 4
      return floatBuffer( data )
    break

    default:
      throw new Error(`Invalid encoding ${encoding}`)
  }


  function allNumbers( data ) {
    let result = []
    data.replace( /\-?\d+(\.\d+)?/g, function( match ) {
      result.push( parseFloat( match ) )
    } )

    return result
  }

  function floatBuffer( data ) {
    let size = 4
    let length = data.length
    let result = Buffer.alloc( size * length )
    for ( let i = 0; i < length; i ++ )
      result.writeFloatBE( data[i], i * size )
    return result
  }
}
