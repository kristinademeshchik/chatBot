var answers = [
  "I could tell you, but then I'd have to kill you",
  "Answering that would be a matter of national security",
  "You can't possibly compare them!",
  "Both hold a special place in my heart"
];

module.exports = function(robot) {
  return robot.respond(/(which|who) is (better|worse)\?* (.*) or (.*?)\??$/i, function(msg) {
    var choosen_response;
    choosen_response = msg.random([1, 2, 3, 4, 5]);
    if (choosen_response >= 3) {
      return msg.send(msg.random(answers));
    } else {
      return msg.send("Clearly " + msg.match[choosen_response + 2] + " is " + msg.match[2]);
    }
  });
};

