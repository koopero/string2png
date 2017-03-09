#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var options = argv

const Promise = require('bluebird')
    , os = require('os')

var data = options._.join('')
return Promise.resolve( require('get-stdin')() )
  .then( ( stdin ) => {
    data += stdin
    data = require('./png')( data, options )

    let output = options['output'] || options['o']

    if ( output ) {
      return require('./output')( data, output, options )
    }

    if ( !options['raw'] )
      data = require('./datauri')( data, options )+os.EOL

    process.stdout.write( data )
  })
  .then( () => data )
