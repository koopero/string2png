const assert = require('chai').assert
const resolveTest = require('path').resolve.bind( null, __dirname )
describe('input', () => {
  it('will load a file', async () => {
    const cli = require('../src/cli')
    const opt = {
      input: resolveTest( 'weather.csv' ),
      width: 3,
      channels: 'rgb',
      normalize: true,
      encoding: 'float',
      bytes: 4,
    }

    const input = await require('../src/input')( opt )
    const floats = require('../src/bytes')( input, opt )
    assert.isArray( floats )
    assert( floats.length > 3000 )
  })
})