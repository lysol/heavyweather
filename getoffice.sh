#!/bin/bash
curl -s "https://forecast.weather.gov/MapClick.php?lat=$1&lon=$2" | grep "Forecast Discussion" | grep -o "site=[^&]\+" | sed -e 's/site=//' | head -n 1
