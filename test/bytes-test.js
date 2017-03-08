const assert = require('chai').assert
describe('bytes', () => {
  const bytes = require('../src/bytes')

  it('will bytes hex by default', () => {
    const result = bytes('7f')
    assert.isArray( result )
    assert.equal( result.length, 1 )
    assert.deepEqual( result, [0x7f / 255] )
  })

  describe('hex', () => {
    it('will ignore whitespace', () => {
      const result = bytes('   #zoo kilns turn# ff00ff cc ')
      assert.equal( result.length, 4 )
    })
  })
})
