module.exports = isNumberArray

function isNumberArray( value, depth ) {
  if ( !Array.isArray( value ) )
    return false

  depth = parseInt( depth ) || 0

  for ( let index = 0; index < value.length; index ++ )
    if ( depth )
      if ( !isNumberArray( value, depth - 1 ) )
        return false 
    else if ( 'number' != typeof value[index] )
      return false

  return true
}