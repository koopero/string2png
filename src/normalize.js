const isNumberArray = require('./util/isNumberArray')

module.exports = function normalize( data, measured, options ) {
  if ( !Array.isArray( measured ) ) {
    options = measured
    measured = null
  }

  options = require('./options')( options )
  let channels = options.normalize

  if ( !isNumberArray( data ) )
    data = require('./bytes')( data, options )

  if ( !channels )
    return data

  if ( !measured ) {
    measured = require('./measure')( data, options )
  }

  let result = []

  for ( let index = 0; index < data.length; index ++ ) {
    let channel = index % channels
    let value = data[index]
    let min = parseFloat( measured[0][channel] )
    let max = parseFloat( measured[1][channel] )
    result[index] = ( ( value - min ) / ( max - min ) || 0 )
  }

  return result
}

function mix( a, b, c ) {
  return ( a * ( 1-c) ) + b * c
}