/*
 Description:
 In order to get ID number of any city use the following link:
 http://bulk.openweathermap.org/sample/

 Minsk id = 625144

 Dependencies:
 * node-schedule

 Configuration:
 CITY_ID
 */

var cron = require('node-schedule');

var responseHandler = function (data) {
  var str,
    currentDayWeather,
    currentTemperature,
    maxTemperature,
    rainData = '',
    currentDate = new Date().getDate();

  currentTemperature = maxTemperature = data.list[0].main.temp;

  str = 'It\'s ' + data.list[0].weather[0].description + ' for now. ' +
    'The temperature at ' + data.list[0].dt_txt.split(' ')[1] + ' will be ' + currentTemperature;

  currentDayWeather = data.list.filter(function (element) {
    return element.dt_txt.split(' ')[0].split('-')[2] == currentDate;
  });

  currentDayWeather.forEach(function (element) {
    if (rainData.length == 0 && element.weather[0].main == 'Rain') {
      rainData = '. It will be ' + element.weather[0].description + ' at ' + element.dt_txt.split(' ')[1];
      str += rainData;
    }

    if (maxTemperature < element.main.temp) {
      maxTemperature = element.main.temp;
    }
  });
  str += ' Max temperature will be ' + maxTemperature;

  return str;
};

module.exports = function (robot) {

  robot.hear(new RegExp('Send me the weather, pls', 'i'), function (response) {
    var currentWeather,
      url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=' + process.env.CITY_ID + '&units=metric&APPID=62cb294f506741358b20565888f4a2e2';

    robot.http(url).get()(function (err, res, body) {
      if (err) {
        console.log('error');
      }
      else {
        currentWeather = responseHandler(JSON.parse(body));
        response.send(currentWeather);
      }
    });

    cron.scheduleJob({hour: 7, minute: 30, dayOfWeek: [1, 2, 3, 4, 5, 6, 7]}, function () {
      response.send(currentWeather);
    });

    response.send('No problem ;)');
  });

};

