const assert = require('chai').assert
const resolveTest = require('path').resolve.bind( null, __dirname )
const fs = require('fs-extra')
describe('system', () => {


  it('will create PNG from CSV with pseudo-cli', async () => {
    const cli = require('../src/cli')
    const opt = {
      input: resolveTest( 'weather.csv' ),
      width: 3 * 7,
      channels: 'rgb',
      normalize: 9,
      logarithmic: 1,
      encoding: 'float',
      bytes: 4,
      measure: resolveTest('scratch/weather.json'),
      output: resolveTest('scratch/weather.png'),
    }

    await require('../src/cli').execute( opt )


    let resultPNG = await fs.readFile( resolveTest('scratch/weather.png' ) )
    assert( resultPNG.length > 300 )
  })

  it('will create glitchy PNG from this file', async () => {
    const cli = require('../src/cli')
    const opt = {
      input: resolveTest( 'system-test.js' ),
      square: true,
      channels: 'rgb',
      encoding: 'hex',
      normalize: 3,
      logarithmic: 1,
      output: resolveTest('scratch/glitch.png'),
    }

    await require('../src/cli').execute( opt )


    let resultPNG = await fs.readFile( resolveTest('scratch/glitch.png' ) )
    assert( resultPNG.length > 100 )
  })
})

