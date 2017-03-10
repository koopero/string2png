'use strict'
module.exports = function datauri( data, options ) {
  if ( !Buffer.isBuffer( data ) )
    data = require('./png')( data, options )

  return 'data:image/png;base64,'+data.toString('base64')
}
