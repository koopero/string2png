'use strict'
module.exports = fill

const bytes = require('./bytes')
    , Colour = require('deepcolour')

function fill( data, length, options ) {
  var background

  data = data || []

  if ( data.length > length )
    data = data.slice(0,length)

  for ( let i = 0; i < length; i ++ ) {
    if ( !Colour.isColour( data[i] ) ) {
      let colour = new Colour( options.background )
      colour.set( data[i] )
      data[i] = colour
    }
  }

  return data
}
