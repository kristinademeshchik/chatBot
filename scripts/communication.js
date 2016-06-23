// Minsk id=625144
var queries = ['Wheather', 'What the weather today?'];

module.exports = function(robot) {
  queries.forEach(function(query) {
    robot.hear(new RegExp(query, 'i'), function (response) {
      var currentWeather;
      robot.http("http://api.openweathermap.org/data/2.5/forecast/city?id=625144&APPID=62cb294f506741358b20565888f4a2e2").get()(function(err, res, body) {
        if (err) {
          console.log('error');
        }
        else {
          currentWeather = body;
          console.log(body.city);
        }
        response.reply(currentWeather);
      });
    });
  });
};

