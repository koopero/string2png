console.log('Note: This script requires ImageMagick to be installed')

const exec = require('handleshells').exec
    , Promise = require('bluebird')
    , yaml = require('js-yaml')
    , fs = Promise.promisifyAll(require('fs'))
    , path = require('path')
    , resolve = path.resolve.bind( path, __dirname, '..' )
    , output = require('../src/output')

const cli = resolve( 'src','cli.js')

const mdFile = resolve( 'example','README.md')

var mdHeader

return fs.readFileAsync( resolve('test','exampleHeader.md'),'utf8')
.then( ( header ) => mdHeader = header )
.then( () => fs.readFileAsync( resolve( 'test','examples.yaml' ), 'utf8' ) )
.then( yaml.load )
.mapSeries( eachExample )
.then( ( markdowns ) => mdHeader + markdowns.join('\n\n') )
.then( ( markdown ) => fs.writeFileAsync( mdFile, markdown ))

function eachExample( example ) {
  const name = example.name
      , options = example.options
      , optionsStr = stringifyOptions( options )
      , data = example.data
      , destFile =  `${name}.png`
      , destAbs = resolve('example', destFile )
      , enlargedName = `${name}-enlarged.png`
      , enlarged = resolve('example', enlargedName )
      , cmdStr = `string2png ${optionsStr} ${data} -o example/${destFile}`

  let markdown =
`## ${name}

${example.description}
\`\`\` sh
${cmdStr}
\`\`\`
![${cmdStr}](${enlargedName})
`

  console.log(cmdStr)
  return output( data, destAbs, options )
  .then( () => exec('convert {{ destAbs }} -interpolate Nearest -filter Point -resize 6400% {{ enlarged }}', { destAbs, enlarged } ) )
  .then( () => markdown )

}

function stringifyOptions( options ) {
  let result = []
  for ( let k in options ) {
    result.push(`--${k} ${options[k]}`)
  }
  return result.join(' ')
}
