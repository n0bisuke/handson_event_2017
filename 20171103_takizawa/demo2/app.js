'use strict';

const RollingSpider = require('rolling-spider');
const keypress = require('keypress');
const DRONE_UUID = process.env.DRONE_UUID || `dd62e640770f46d08a05e5d029ed82dc`; //各々書き換えましょう。
const drone = Promise.promisifyAll(new RollingSpider({uuid:DRONE_UUID}));
const STEPS = 5;

let activeFlag = true;

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

const cooldown = () => {
  activeFlag = false;
  setTimeout(() => activeFlag = true, STEPS);
}

// Promise化
const droneConnectAsync = () => new Promise(resolve => drone.connect(resolve('connect success!')));
const droneSetupAsync = () => new Promise(resolve => drone.setup(resolve('setup success!')));
const droneFlatTrimAsync = () => new Promise(resolve => drone.flatTrim(resolve('trim success!')));
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec)); // async/awaitでのSleep処理

// メインの処理
const main = async () => {
  //ドローンとの接続/セットアップ
  console.log('connecting...');
  let res = await droneConnectAsync();
  console.log(res);
  res = await droneSetupAsync();
  console.log('Configured for Rolling Spider! ', drone.name);
  res = await droneFlatTrimAsync();
  console.log(res);
  drone.startPing();
  res = await droneFlatTrimAsync();
  console.log(res);
  console.log(drone.name + ' => SESSION START');
  activeFlag = true;
  
  // 離陸
  await sleep(5000);
  drone.takeOff();

  // 5秒待って前進
  await sleep(5000);
  drone.forward({steps:10});
  cooldown();

  // 5秒待って離陸
  await sleep(5000);
  drone.land();

  // 10秒後に接続解除
  await sleep(10000);
  console.log('disconnect');
  drone.disconnect();
  process.stdin.pause();
  process.exit();
};

main();

// listen for the "keypress" event
process.stdin.on('keypress', async (ch, key) => {
  console.log('got "keypress" => ', key);
  if (activeFlag && key) {
    let param = {tilt:0, forward:0, turn:0, up:0};

    if (key.name === 'l') {
      console.log('land');
      drone.land();
    } else if (key.name === 't') {
      console.log('takeoff');
      drone.takeOff();
    } else if (key.name === 'h') {
      console.log('hover');
      drone.hover();
    } else if (key.name === 'x') {
      console.log('disconnect');
      drone.disconnect();
      process.stdin.pause();
      process.exit();
    }
 
    if (key.name === 'up') {
      drone.forward({ steps: STEPS });
      cooldown();
    } else if (key.name === 'down') {
      drone.backward({ steps: STEPS });
      cooldown();
    } else if (key.name === 'right') {
      drone.tiltRight({ steps: STEPS });
      cooldown();
    } else if (key.name === 'left') {
      drone.tiltLeft({ steps: STEPS });
      cooldown();
    } else if (key.name === 'u') {
      drone.up({ steps: STEPS });
      cooldown();
    } else if (key.name === 'd') {
      drone.down({ steps: STEPS });
      cooldown();
    }
 
    if (key.name === 'm') {
      param.turn = 90;
      drone.drive(param, STEPS);
      cooldown();
    }
    if (key.name === 'h') {
      param.turn = -90;
      drone.drive(param, STEPS);
      cooldown();
    }
    if (key.name === 'f') {
      drone.frontFlip();
      cooldown();
    }
    if (key.name === 'b') {
      drone.backFlip();
      cooldown();
    }
 
  }
});