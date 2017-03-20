'use strict'
module.exports = function css( data, options ) {
  if ( !Buffer.isBuffer( data ) )
    data = require('./png')( data, options )

  return 'url(data:image/png;base64,'+data.toString('base64')+')'
}
