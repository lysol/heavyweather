#!/bin/bash

curgeo=$(cat "$HOME/.geo")
apikey=$(cat "$HOME/.dskey")
curl -s "https://api.darksky.net/forecast/$apikey/$curgeo">"$HOME/.weather.json"

