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

module.exports = function (robot) {

  robot.hear(new RegExp('Send me the weather, pls', 'i'), function (response) {
    var currentWeather,
      url = 'http://api.openweathermap.org/data/2.5/forecast/city?id=' + process.env.CITY_ID + '&units=metric&APPID=62cb294f506741358b20565888f4a2e2';

    cron.scheduleJob({hour: 17, minute: 13, dayOfWeek: [1,2,3,4,5,6,7]}, function(){
      robot.http(url).get()(function (err, res, body) {
        if (err) {
          console.log('error');
        }
        else {
          currentWeather = JSON.parse(body);
        }
        response.send('Current temperature is ' +  currentWeather.list[0].main.temp);
      });
    });

    response.send('No problem ;)');
  });

};

