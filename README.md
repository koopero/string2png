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
