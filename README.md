`string2png` is a small, flexible utility to compile strings to PNG images files.
It is intended to ease the creation of extremely low resolution graphical assets
such as gradient and patterns.

# Examples

*Note: All images have been scaled up 64x to ease viewing.*

## rgb

Simple 3-pixel png
``` sh
string2png  ff0000 00ff00 0000ff -o example/rgb.png
```
![string2png  ff0000 00ff00 0000ff -o example/rgb.png](example/rgb-enlarged.png)

## checkerboard

Checkboard pattern
``` sh
string2png --encoding hex2 --width 2 --channels v f00f -o example/checkerboard.png
```
![string2png --encoding hex2 --width 2 --channels v f00f -o example/checkerboard.png](example/checkerboard-enlarged.png)


See [example/README.md](example/README.md) for more examples.


# Usage

## Javascript

``` js
const string2png = require('string2png')

// Default options
const options = {
  encoding: 'hex',
  channels: 'rgb',
  width: 0,
  height: 0,
  background: 'rgba(0,0,0,1)'
}

// Write to a PNG file
string2png.output( 'ff0000 00ff00 0000ff', 'outputfile.png', options )
  .then( () => console.log('Wrote file') )

// Return PNG as buffer
let buffer = string2png.png( 'ff0000 00ff00 0000ff', options )

// Return PNG as data URI
let data = string2png.datauri( 'ff0000 00ff00 0000ff', options )  
```


## Command line

By default, the utility `pixels2png` will output a data URI string to stdout. To
output a file, use the `--output` or `-o` option. Any non-options on the command
line will be appended to stdin and used as input data.

Make a single green pixel by piping stdin:
``` sh
echo 00ff00 | pixels2png
```

# Options

### encoding

- **hex** *default* - Parse hexadecimal data like CSS colours. All non-hex input will be ignored. Example: `ff0000`
- **hex2** - Parse CSS-style short hex data. Each hex digit will be a single value. Example: `f00`
- **float** - Search input data for all substrings that look like numbers. Any delimiter maybe be used. Example: `0.5 0 0 - CSS maroon`
- **percent** - Like `float`, except divide by `100`. Example: `0 100% 100 - CSS Aqua`
- **decimal** -  Like `float`, except divide by `255`. Example: `220,20,60 - CSS Crimson`


### channels

A string or array list of colour channels to be interpreted from input, in the order they are to be parsed. The default is
`rgb`. Supported channels are `rgba` and `hsv`. See [examples](example/README.md) for many different usages of the `channels` option.  

Any unrecognized channel will be parsed and thrown out, allowing padding within data.

### width

The width, in pixels, of the output file. If `width` is not specified, it will default to
the length of parsed colour data, giving a `height` of `1`. If `width` is specified, the
length of data will be rounded up to the nearest divisor of `width` by padding with `background`
to ensure a rectangular output.

### height

If `height` is specified, the output will be cropped or padded.

### background

The default value to use for pixel output. Any CSS string may be used. This colour
value can be altered by input data on a channel-by-channel basis. See example [alter-red](example/README.md#alter-red)
