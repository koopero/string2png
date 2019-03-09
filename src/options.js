module.exports = options

function options( opt ) {
  let result = {}
  opt = opt || {}

  var channels = opt.channels || 'rgb'

  if ( 'number' == typeof channels ) {
    channels = parseInt( channels ) || 0
    channels = 'rgba'.substr( 0, channels ) + '0'.repeat( Math.max( 0, channels - 4 ) )
  }

  if ( 'string' == typeof channels ) {
    channels = channels.split('')
  }

  result.channels = channels

  if ( opt['normalize'] ) {
    result.normalize = parseInt( opt['normalize'] ) || channels.length
  } else {
    result.normalize = 0
  }


  result.encoding = opt.encoding
  result.bytes = opt.bytes


  return result
}