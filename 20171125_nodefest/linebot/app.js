'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const axios = require('axios');
const PORT = process.env.PORT || 3000;

// const config = {
//     channelAccessToken: '',
//     channelSecret: ''
// };

// const app = express();

// app.post('/webhook', line.middleware(config), (req, res) => {
//     console.log(req.body.events);
//     Promise
//       .all(req.body.events.map(handleEvent))
//       .then((result) => res.json(result));
// });


axios.get('https://nodejs.org/ja/')
.then(function (response) {
  // console.log(response);
  let item = response.data;
  let status = item.match(/最新版"  data-version="(.*?)">/)[1];
  console.log(status);
})
.catch(function (error) {
  console.log(error);
});

// const client = new line.Client(config);

// function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     return Promise.resolve(null);
//   }

//   return client.replyMessage(event.replyToken, {
//     type: 'text',
//     text: event.message.text
//   });
// }

// app.listen(PORT);