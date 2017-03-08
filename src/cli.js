#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var options = argv

const Promise = require('bluebird')
    , fs = Promise.promisifyAll( require('fs') )

const png = require('./png')

var data = options._.join(' ')

Promise.resolve( require('get-stdin')() )
  .then( ( stdin ) => {
    data += stdin
    data = png( data, options )

    let output = options['output'] || options['o']

    if ( output ) {
      return fs.writeFileAsync( output, data )
    } else {
      data = 'data:image/png;base64,'+data.toString('base64')
      console.log( data )
    }
  })
