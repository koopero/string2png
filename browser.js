'use strict'
require('buffer-concat/polyfill')

const string2png = require('./src/main')
string2png.bytes = require('./src/bytes')
string2png.channels = require('./src/channels')
string2png.encoding = require('./src/encoding')
string2png.png = require('./src/png')
string2png.fill = require('./src/fill')
string2png.datauri = require('./src/datauri')
string2png.css = require('./src/css')
module.exports = string2png

