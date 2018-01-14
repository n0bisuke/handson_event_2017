'use strict';

const https = require('https');
const GROUP_ID = ''; //グループID
const TOKEN = ''; //トークン
const URL = `https://graph.facebook.com/${GROUP_ID}/feed?access_token=${TOKEN}`;

const response = https.get(URL, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk; //console.log(body);←元データ
    });

    res.on('end', (res) => {
        res = JSON.parse(body);
        response = res.data;
        //console.log(response);
    });
}).on('error', (e) => {
    console.log(e.message); //エラー時
});

exports.index = (req, res) => {
    console.log(response);
    res.render('index', { title: 'Express', data: response});
};
