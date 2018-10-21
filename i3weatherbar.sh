#!/bin/sh
i3status | (read line && echo "$line" && read line && echo "$line" && read line && echo "$line" && while :
do
  read line
  echo $(~/bin/weather.js) ${line#,\[}" || exit 1
done)
