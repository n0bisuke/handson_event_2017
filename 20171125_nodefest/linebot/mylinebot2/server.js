'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'Ic/oem8Ri2rltI6A9W/gq8fmHwYa9UP/SP2ad4cpQLQloKWcW5d+smdsAKts8EV/pIlzaVzcFchQCwIK804pwYL9lkqPQpbmUHiDeQN/9jfXPt5G6DTspoPzr8+ukZ6aZN5ZZbsAbfpNbb9neyS4owdB04t89/1O/w1cDnyilFU=',
    channelSecret: '63fe9b32dd179c790d1a3d4f72386ea9'
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let mes = ''
  if(event.message.text === 'Node.jsの最新バージョン教えて！'){
    mes = 'ちょっとまってね';
    getNodeVer(event.source.userId);
  }else{
    mes = event.message.text;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: mes
  });
}

const getNodeVer = async (userId) => {
    const res = await axios.get('https://nodejs.org/ja/');
    const item = res.data;
    const version = item.match(/最新版"  data-version="(.*?)">/)[1];
    console.log(version);

    await client.pushMessage(userId, {
        type: 'text',
        text: `今の最新は${version}だよ！`,
    });
    // .then(res => console.log(res));
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);