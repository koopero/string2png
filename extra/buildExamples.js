'use strict'
console.warn('Note: This script requires ImageMagick to be installed')

const exec = require('child_process').exec
    , Promise = require('bluebird')
    , yaml = require('js-yaml')
    , fs = Promise.promisifyAll(require('fs'))
    , path = require('path')
    , deindent = require('deindent')
    , resolve = path.resolve.bind( path, __dirname, '..' )
    , main = require('../index')

const cli = resolve( 'src','cli.js')

const mdFile = resolve( 'example','README.md')

var mdHeader

return fs.readFileAsync( resolve('extra','exampleHeader.md'),'utf8')
.then( ( header ) => mdHeader = header )
.then( () => fs.readFileAsync( resolve( 'extra','examples.yaml' ), 'utf8' ) )
.then( yaml.load )
.mapSeries( eachExample )
.then( ( markdowns ) => mdHeader + markdowns.join('\n\n') )
.then( ( markdown ) => fs.writeFileAsync( mdFile, markdown ))

async function eachExample( example ) {
  const name = example.name
      , options = example.options
      , optionsStr = stringifyOptions( options )
      , data = example.data
      , destFile =  `${name}.png`
      , output = path.join( 'example', destFile )
      , enlargedName = `${name}-enlarged.png`
      , enlarged = path.join( 'example', enlargedName )
      , cmdStr = `string2png ${optionsStr} ${data} -o example/${destFile}`
      , scale = (example.scale || '48') + '00%'



  let markdown = deindent`
    ## ${name}

    ${example.description}
    \`\`\` sh
    ${cmdStr}
    \`\`\`
    ![${cmdStr}](${enlargedName})
  `

  await main( { data, output, ...options } )
  let enlarge = `convert ${ output } -interpolate Nearest -filter Point -resize ${ scale } -define png:format=png32 -strip ${ enlarged }`
  let execOpt = {
    cwd: resolve(),
    shell: true,
  }
  await Promise.fromCallback( cb => exec( enlarge, execOpt, cb ) )
  return markdown
}

function stringifyOptions( options ) {
  let result = []
  for ( let k in options ) {
    result.push(`--${k} ${options[k]}`)
  }
  return result.join(' ')
}
