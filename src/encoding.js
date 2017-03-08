module.exports = decode

function decode( data, options ) {
  if ( Buffer.isBuffer( data ) )
    return data

  options = options || {}

  let encoding = options.encoding || 'hex'

  switch( encoding ) {
    case 'hex':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
    break

    case 'hex2':
      data = data.replace(/[^0-9a-fA-F]/gi, '' ).toUpperCase()
      data = data.split('').map( v=>v+v ).join('')
      encoding = 'hex'
    break
  }

  var buffer = Buffer.from( data, encoding )

  return buffer
}
