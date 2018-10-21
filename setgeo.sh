#!/bin/bash
curl -s ipinfo.io/ip | xargs geoiplookup | grep City | grep -o "\-\?[0-9]\+\.[0-9]\+,\ \-\?[0-9]\+\.[0-9]\+" | sed -e 's/\s\+//'>"$HOME/.geo"

