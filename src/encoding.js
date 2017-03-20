'use strict'
module.exports = decode

var bufferFrom = require('buffer-from')
  , isBuffer = require('isbuffer')

var DIVISOR = {
  float: 1,
  percent: 100,
  dec: 255
}

function decode( data, options ) {
  if ( isBuffer( data ) )
    return data

  options = options || {}

  var encoding = options.encoding || 'hex'

  switch( encoding ) {
    case 'hex':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
      if ( data.length & 1 )
        data = data.substr(0,data.length-1)
      return bufferFrom( data, encoding )
    break

    case 'hex2':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
      data = data.split('').map( function(v) { return v+v } ).join('')
      encoding = 'hex'
      return bufferFrom( data, encoding )
    break

    case 'float':
    case 'percent':
    case 'dec':
      var divisor = DIVISOR[encoding]
      data = allNumbers( data )
      data = data.map( function ( v ) { return v / divisor } )

      if ( options.bytes && options.bytes !== 4 )
        throw new Error("Invalid bytes for encoding "+encoding+" ( must be 4 )")

      options.bytes = 4
      return floatBuffer( data )
    break

    default:
      throw new Error("Invalid encoding "+encoding)
  }


  function allNumbers( data ) {
    var result = []
    data.replace( /\-?\d+(\.\d+)?/g, function( match ) {
      result.push( parseFloat( match ) )
    } )

    return result
  }

  function floatBuffer( data ) {
    var size = 4
    var length = data.length
    var result = Buffer.alloc( size * length )
    for ( var i = 0; i < length; i ++ )
      result.writeFloatBE( data[i], i * size )
    return result
  }
}
