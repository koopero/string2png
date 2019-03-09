const assert = require('chai').assert
const resolveTest = require('path').resolve.bind( null, __dirname )
const fs = require('fs-extra')
describe('remote', () => {
  it('will create glitchy PNG from reddit', async () => {
    const cli = require('../src/cli')
    const opt = {
      input: 'http://reddit.com',
      square: true,
      channels: 'v',
      encoding: 'ascii',
      normalize: 1,
      logarithmic: 1,
      output: resolveTest('scratch/reddit.png'),
    }

    await require('../src/cli').execute( opt )
  }).timeout(10000)

  it('will create glitchy PNG from google', async () => {
    const cli = require('../src/cli')
    const opt = {
      input: 'http://google.com',
      square: true,
      channels: 'rgb',
      encoding: 'ascii',
      normalize: 3,
      logarithmic: 0,
      output: resolveTest('scratch/google.png'),
    }

    await require('../src/cli').execute( opt )
  }).timeout(10000)
})

