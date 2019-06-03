module.exports = input

const urllib = require('url')
const fs = require('fs-extra')
const request = require('request-promise')

async function input( opt ) {
  opt = require('./options')( opt )

  let result = ''
  let inputs = opt.input
  if ( !Array.isArray( inputs ) )
    inputs = [ inputs ] 

  for ( let input of inputs ) {
    if ( !input )  continue
    let url = urllib.parse( input )
    url.protocol = url.protocol || 'file:'

    if ( url.protocol == 'file:' ) {
      result += await fs.readFile( url.pathname, 'utf8' )
    } else {
      result += await request( { url } )
    }
  }

  return result
}