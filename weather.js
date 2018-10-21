#!/usr/bin/env node
const fs = require('fs'),
    os = require('os'),
    currentTime = Math.round((new Date).getTime() / 1000),
    iconMap = {
        'clear-day': '☀️',
        'clear-night': ' ',
        'rain': '🌧️',
        'sleet': '🌨️',
        'snow': '❄️',
        'wind': '🌬️',
        'fog': '🌫️',
        'cloudy': '☁️',
        'partly-cloudy-day': '🌥️',
        'partly-cloudy-night': '☁️',
        'hail': '🌨️',
        'thunderstorm': '🌩️',
        'tornado': '🌪️',
        'cyclone': '🌀',
        'hurricane': '🌀',
        'moon': {
            0: '🌑',
            0.125: '🌒',
            0.25: '🌓',
            0.375: '🌔',
            0.5: '🌕',
            0.625: '🌔',
            0.75: '🌗',
            0.875: '🌘'
        }
    };

let weatherData;

try {
    weatherData = JSON.parse(fs.readFileSync(`${os.homedir()}/.weather.json`));
} catch(e) {
    console.error(e);
    process.stdout.write(`${iconMap.thunderstorm}?\n`);
    process.exit(1);
}

if (!weatherData.currently) {
    process.stdout.write(`${iconMap.thunderstorm}?\n`);
    process.exit(1);
}

const degToCompass = num => {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

const moon = (moons, phase) => moons[Object.keys(moons)
        .reduce((c, a) =>
            a !== null ? a :
                phase > c ? c :
                    null)];

const emoji = (icons, iconName, _default) =>
    icons && icons[iconName] || _default || '?';

const formatTemp = (temp, apparentTemp) => {
    temp = Math.round(temp);
    apparentTemp = Math.round(apparentTemp);
    const differ = apparentTemp - temp,
        difText = differ > 5 ?
            `${differ < 0 ?
                '' :
                '+'}°${differ}` :
            '';
    return `${temp}°${difText}`;
}

const formatConditions = (currentTime, conditions, sunrise, sunset, phase) => {
    const currentIcon = emoji(iconMap, conditions.icon),
        dailyMoon = currentTime < sunrise || currentTime > sunset ?
            ` ${moon(iconMap.moon, phase)}` : '',
        windy = conditions.windSpeed > 15,
        wind = Math.round(conditions.windSpeed),
        gusty = conditions.windGust > 8,
        gust = Math.round(conditions.windGust),
        windDir = degToCompass(conditions.windBearing),
        windText = windy || gusty ? ` ${wind}/${gust}mph ${windDir}` : '',
        tempText = formatTemp(conditions.temperature,
            conditions.apparentTemperature);
    return result = `${currentIcon}${dailyMoon} ${tempText}${windText}`;
}   

const hourlyConditions = (weatherData, currentTime, limit) => {
    const currently = weatherData.currently,
        hourly = weatherData.hourly,
        sunrise = weatherData.daily.sunriseTime,
        sunset = weatherData.daily.sunsetTime,
        phase = weatherData.daily.data.moonPhase;

    return hourly.data.filter(dp => dp.time > currentTime)
        .map(dp =>
            formatConditions(currentTime, dp, sunrise, sunset, phase)) 
        .slice(0, limit)
        .join(' ') + '\n';
}

function currentConditions(weatherData, currentTime) {
    const currently = weatherData.currently,
        daily = weatherData.daily,
        stormNear = currently.nearestStormDistance < 10,
        alertsPresent = weatherData.alerts && weatherData.alerts.length > 0,
        alertText = alertsPresent ? '⚠️' : '',
        since = Math.round((currentTime - currently.time) / 60),
        sinceText = since > 5 ? ` (${since}m)` : '',
        conditions = formatConditions(currentTime, currently, daily.data[0].sunriseTime,
            daily.data[0].sunsetTime, daily.data[0].moonPhase);
    return `${alertText}${conditions}${sinceText}\n`;
}

if (process.argv.length < 3) {
    process.stdout.write(currentConditions(weatherData, currentTime));
} else if (process.argv[2] === 'hourly') {
    const limit = process.argv[3] && parseInt(process.argv[3]) || 5;
    process.stdout.write(hourlyConditions(weatherData, currentTime, limit));
}
