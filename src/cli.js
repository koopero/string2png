#!/usr/bin/env node
exports.execute = execute

if ( module == require.main ) {
  const argv = require('minimist')(process.argv.slice(2))
  execute( argv )
}

async function execute( options ) {
  const Promise = require('bluebird')
  const os = require('os')
  const fs = require('fs-extra')
  
  var data = ''
  
  // Get minimist data
  if ( options._ )
    data += options._.join(' ')

  return Promise.resolve( require('get-stdin')() )
    .then( async ( stdin ) => {

      data += stdin
      data += await require('./input')( options )

      let floats = require('./normalize')( data, options )
      let measured = require('./measure')( floats, options )

      data = require('./channels')( data, options )
      data = require('./png')( data, options )
  
      var output = options['output'] || options['o']

      if ( options.measure ) {
        await fs.outputJSON( options.measure, measured )
      }
  
      if ( output )
        return require('./output')( data, output, options )
  
      if ( !options['raw'] )
        data = require('./datauri')( data, options )+os.EOL
  
      process.stdout.write( data )
    })
    .then( () => data )
  
}

