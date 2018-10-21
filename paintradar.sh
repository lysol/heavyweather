#!/bin/bash

basex=600
basey=550
factor=${FACTOR:-4}
tx=$(echo "${basex}*${factor}" | bc)
ty=$(echo "${basey}*${factor}" | bc)

convert "$HOME/.topo.jpg" -monochrome -negate -colors 256 -brightness-contrast -75 /tmp/t.png
convert "$HOME/.radar.gif" -monochrome -negate -transparent black /tmp/r.png
convert /tmp/t.png /tmp/r.png -gravity Center -composite -interpolate Nearest -filter point -resize "${tx}x${ty}" -gravity Center -crop 1920x1080+0+0 +repage "$HOME/.background.png"

gsettings set org.gnome.desktop.background picture-uri "file://$HOME/.background.png"
feh --bg-center "$HOME/.background.png"

