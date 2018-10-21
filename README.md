heavy weather
=============

just some scripts I use for
* setting i3status with some weather conditions
* setting desktop wallpaper to a monochrome radar map, very abstract, oh

it looks like this
![Radar Map](https://s3-us-east-2.amazonaws.com/cgagraphics-mastodon/media_attachments/files/000/028/316/original/e76bc7cb2728942b.png)

The files, in order of operations, sorta
-----------------------------------------
* `setgeo.sh`: gets yr public ip and then gets your lat/long and saves em to ~/.geo
* `updateradar.sh`: sets the wallpaper!
* `getradar.sh`: fetches your geolocated weather.gov office's topographical and radar map layers. you could poke around on weather.gov and include political divisions/roads/etc but I like it a little abstract
* `paintradar.sh`: mangles the images into the abstract stuff. if you're not using gnome the feh invocation's got you covered. otherwise gsettings's got you if you're in the gnomezone
* `getoffice.sh`: does a little webscraping to fetch the actual office code for a given lat/long
* `weather.js`: parses the dark sky json and creates the i3status crap
* `i3weatherbar.sh`: configure i3 as follows to get emoji weather in your i3status bar lol. use it as a reference, if you're using i3 and made it here you know what you're doing:
~~~
    bar {
            #status_command i3status
            status_command exec ~/bin/net-speed.sh
    }
~~~
* `setweather.sh`: fetches and saves current weather conditions, so as to not hammer dark sky

instructions
------------
* copy all the crap to `~/bin`
* apt-get install feh imagemagick nodejs
* get a dark sky api key and put it in `~/.dskey`
* set up a crontab to your liking similar to the one included (use `crontab -e`)
* it'll probably break sorry

notes
-----

If you look at all these files, they all can act somewhat independently. You don't have to set up a cronjob that checks your current location, you can just set your office code manually. You can use a different method for saving Dark Sky's conditions, and so on. This is just how I have it set up.
