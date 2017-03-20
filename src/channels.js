'use strict'

var fill = require('./fill')
  , Colour = require('deepcolour')

module.exports = function channels( data, options ) {
  if ( !Array.isArray( data ) )
    data = require('./bytes')( data, options )

  options = options || {}

  var channels = options.channels || 'rgb'

  if ( 'number' == typeof channels ) {
    channels = parseInt( channels ) || 0
    channels = 'rgba'.substr( 0, channels ) + '0'.repeat( Math.max( 0, channels - 4 ) )
  }

  if ( 'string' == typeof channels ) {
    channels = channels.split('')
  }

  if ( !Array.isArray( channels ) )
    throw new Error('options.channels must be number, string or array')

  if ( !channels.length )
    return []

  var stride = options.stride = parseInt( options.stride ) || channels.length
  var length = Math.ceil( data.length / stride )
  var result = fill( [], length, options )

  for ( var index = 0; index < length; index ++ ) {
    for ( var j = 0; j < stride; j ++ ) {
      var value = data[index*stride+j]
      result[index].setChannelByName( channels[j], value )
    }
  }

  return result
}
