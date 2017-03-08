const assert = require('chai').assert
describe('encoding', () => {
  const encoding = require('../src/encoding')

  it('will encoding hex by default', () => {
    const result = encoding('80')
    assert(  Buffer.isBuffer( result ) )
    assert.equal( result.length, 1 )
    assert.equal( result[0], 128 )
  })

  describe('hex', () => {
    it('will ignore whitespace', () => {
      const result = encoding('   #zoo kilns turn# ff00ff cc ')
      assert.equal( result.length, 4 )
    })
  })
})
