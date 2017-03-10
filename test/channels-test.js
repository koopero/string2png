'use strict'
const assert = require('chai').assert
describe('channels', () => {
  const channels = require('../src/channels')

  it('hex by default', () => {
    const result = channels('ff0000,00ffff')
    assert.isArray( result )
    assert.equal( result.length, 2 )
    assert.equal( result[0].hex, '#ff0000' )
    assert.equal( result[1].hue, 0.5 )
  })

  describe('channels', () => {
    it('one channel', () => {
      const result = channels('ff00', { channels: 'a' } )
      assert.equal( result.length, 2 )
      assert.equal( result[0].hex, '#000000' )
      assert.equal( result[0].alpha, 1 )
      assert.equal( result[1].alpha, 0 )
    })
  })
})
