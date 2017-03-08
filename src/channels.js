module.exports = colours

const bytes = require('./bytes')
    , fill = require('./fill')
    , Colour = require('deepcolour')

function colours( data, options ) {
  data = bytes( data, options )

  options = options || {}

  let channels = options.channels || 'rgb'

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

  let stride = options.stride = parseInt( options.stride ) || channels.length
  let length = Math.floor( data.length / stride )
  let result = fill( [], length, options )

  for ( let index = 0; index < length; index ++ ) {
    for ( let j = 0; j < stride; j ++ ) {
      let value = data[index*stride+j]
      result[index].setChannelByName( channels[j], value )
    }
  }

  return result
}
