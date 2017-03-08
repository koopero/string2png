module.exports = bytes

const encoding = require('./encoding')

function bytes( data, options ) {
  data = encoding( data, options )

  options = options || {}
  let bytes = parseInt( options['bytes'] ) || 1

  if ( bytes != 1 )
    throw new Error('Only uint_8 currently supported')

  let k = data.length
  let result = new Array()

  for ( let i = 0; i < k; i ++ )
    result[i] = data.readUInt8( i ) / 255.0

  return result
}
