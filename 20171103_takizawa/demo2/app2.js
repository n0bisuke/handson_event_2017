'use strict';

const RollingSpider = require("rolling-spider");
const keypress = require('keypress');
keypress(process.stdin);
 
process.stdin.setRawMode(true);
process.stdin.resume();
 
var ACTIVE = true;
var STEPS = 5;
var d = new RollingSpider({uuid:"8d7ebdc7ce72490bbd9666678819a4bb"}); //各々書き換えましょう。
 
function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS);
}
 
d.connect(function () {
 
  d.setup(function () {
    console.log('Configured for Rolling Spider! ', d.name);
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    setTimeout(function () {
      console.log(d.name + ' => SESSION START');
      ACTIVE = true;
    }, 1000);
 
  });
});
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
 
  console.log('got "keypress" => ', key);
 
  if (ACTIVE && key) {
 
    var param = {tilt:0, forward:0, turn:0, up:0};
    
    console.log('takeoff');
    d.takeOff();
    
    setTimeout(() => {
      console.log('land');
      d.land();
    }, 5000);

    if (key.name === 'x') {
        console.log('disconnect');
        d.disconnect();
        process.stdin.pause();
        process.exit();
    }

  }
});