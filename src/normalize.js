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

  let logarithmic = options.logarithmic
  let result = []

  for ( let index = 0; index < data.length; index ++ ) {
    let channel = index % channels
    let value = data[index]
    let min = parseFloat( measured[0][channel] )
    let max = parseFloat( measured[1][channel] )
    // console.log({ value, logarithmic, min, max })
    result[index] = mix( 
      ( ( value - min ) / ( max - min ) || 0 ),
      Math.pow( Math.E, Math.max( 0, Math.log( value - min ) ) / Math.log( max - min ) ),
      logarithmic
    )
  }

  return result
}

function mix( a, b, c ) {
  return ( a * ( 1-c) ) + b * c
}