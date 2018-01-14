'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'ud7Dr1w/TNtO0a6bfucfY3IKkKPmz4pQlvMURv9ou2LPpFbEPh+MdmXX8KjiRVfg/CmJSl3DsPR4PZbqGMSrcv6wEK9wmZ8bdpE1Op5fTy8ZJXa1B+Hk53w3LX8b8HlZ46iSe2UQERJjWFlN+2TBlQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'de1e518464844c2e47a73e6d1f9fa8d0'
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then(result => res.json(result))
      .catch(err => console.log(err));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  let responseMes = '';

  if(event.message.text === '好きな言語は?'){
    responseMes = 'Node.js!';
  }else{
    responseMes = event.message.text;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: responseMes
  });
}

app.listen(PORT);