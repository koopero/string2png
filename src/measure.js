'use strict'

var isBuffer = require('isbuffer')
  , isNumberArray = require('./util/isNumberArray')

module.exports = function measure( data, options ) {
  if ( !isNumberArray( data ) )
    data = require('./bytes')( data, options )

  options = require('./options')( options )
  let channels = options.normalize
  let min = []
  let max = []


  for ( let index = 0; index < data.length; index ++ ) {
    let channel = index % channels
    let value = data[index]

    min[ channel ] = 'undefined' == typeof min[ channel ] && !isNaN( value ) ? value : 
      Math.min( parseFloat( min[channel] ) || 0, value ) 

    max[ channel ] = 'undefined' == typeof max[ channel ] && !isNaN( value ) ? value : 
      Math.max( parseFloat( max[channel] ) || 0, value ) 

  }

  return [ min, max ]
}
