module.exports = string2png

async function string2png( options ) {
  
  let data = options.data || ''
  if ( 'string' != typeof data )
    throw new Error('input must be string')
  
  if ( string2png.input )
    data += await string2png.input( options )

  data = require('./bytes')( data, options )
  let measured = require('./measure')( data, options )
  data = require('./normalize')( data, measured, options )
  data = require('./channels')( data, options )
  data = require('./png')( data, options )

  let output = options['output'] || options['o']

  if ( output && string2png.output )
    await string2png.output( data, output, options )

  if ( !options['raw'] )
    data = require('./datauri')( data, options )

  if ( options.measure ) {
    return { data, measured }
  }

  return data
}

