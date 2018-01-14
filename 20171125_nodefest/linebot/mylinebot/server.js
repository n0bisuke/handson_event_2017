'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'OIo0NPVDRb7bLOQH72EviYfkTBORshRkgxZxEurOb2Bf/5Aue9IHd4KDiogltJqSO65XnE4yUTi04Aq6060N/wfb2xSeq+Eo/aMAGudPg8n/fT6zqyaVPAwDQxo572WKJd1theBQqVR8MSZOP7H7xwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '339c855e019c2934071efe825b6b0899'
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

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);