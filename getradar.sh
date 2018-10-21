#!/bin/bash

office=${OFFICE:-`cat $HOME/.geo | sed -e 's/,/ /' | xargs $HOME/g/bin/getoffice.sh`}
url="https://radar.weather.gov/RadarImg/N0R/${office}_N0R_0.gif"
url2="https://radar.weather.gov/Overlays/Topo/Short/${office}_Topo_Short.jpg"
curl -s -o "$HOME/.radar.gif" "$url"
curl -s -o "$HOME/.topo.jpg" "$url2"

