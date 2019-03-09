const assert = require('chai').assert
describe('normalize', () => {
  it('measure works', () => {
    const normalize = require('../src/normalize')
    const measure = require('../src/measure')
    const bytes = require('../src/bytes')
    const opt = { encoding: 'float', bytes: 4, normalize: 1 }

    let data = bytes( '-2 0 2', opt )
    let result = measure( data, opt )
    assert.isArray( result )
    assert.isArray( result[0] )
    assert.equal( result[0][0], -2 )
    assert.equal( result[1][0],  2 )
  })

  it('works with external measurements', () => {
    const normalize = require('../src/normalize')
    const measure = require('../src/measure')
    const bytes = require('../src/bytes')
    let opt = { encoding: 'float', bytes: 4, normalize: 1 }

    let data = bytes( '-2 0 2', opt )
    let measurements = measure( data, opt  )
    let result = normalize( data, measurements, opt )

    assert.isArray( result )
    assert.equal( result[0], 0 )
    assert.equal( result[1], 0.5 )
    assert.equal( result[2], 1 )

  })


  it('works with derived measurements', () => {
    const normalize = require('../src/normalize')
    const opt = { encoding: 'float', bytes: 4, normalize: 1 }

    let result = normalize( '-2 0 2', opt )
    assert.isArray( result )
    assert.equal( result[0], 0 )
    assert.equal( result[1], 0.5 )
    assert.equal( result[2], 1 )
  })
  

  it('works with multiple channels', () => {
    const normalize = require('../src/normalize')
    const opt = { encoding: 'float', channels: 'rg', normalize: true }

    let result = normalize( '-2 0.5 2 0.75', opt )

    assert.isArray( result )
    assert.equal( result[0], 0 )
    assert.equal( result[1], 0 )
    assert.equal( result[2], 1 )
    assert.equal( result[3], 1 )
  })

  it('works with hex input', () => {
    const normalize = require('../src/normalize')
    const opt = { encoding: 'hex', channels: 'rg', normalize: true }

    let result = normalize( '20 30 40 50', opt )

    assert.isArray( result )
    assert.equal( result[0], 0 )
    assert.equal( result[1], 0 )
    assert.equal( result[2], 1 )
    assert.equal( result[3], 1 )
  })
  
})
