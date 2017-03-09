# Examples

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


See [example/README.md](example/README.md) for plenty more examples.
