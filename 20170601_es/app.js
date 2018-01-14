'use strict'

// const axios = require('axios');
const http = require('http');

const AREA = `030010`; //盛岡
const AREA2= `400040`; //久留米
const BASEURL = `http://weather.livedoor.com/forecast/webservice/json/v1?city=`;
const URL1 = BASEURL+AREA;
const URL2 = BASEURL+AREA2;

const getTenki = (url) => {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            }); 

            res.on('end', (res) => {
                res = JSON.parse(body);
                resolve(res.forecasts[0]);
            });
        }).on('error', (e) => {
            reject(e);
            console.log(e.message); //エラー時
        });
    });
}

// Promise.all([
//     getTenki(URL1),
//     getTenki(URL2)
// ]).then((values) => {
//     console.log(values);
// });

async function getAllTenki() {
    const morioka = await getTenki(URL1);
    const kurume = await getTenki(URL2);
    console.log(morioka);
    console.log(kurume);
}

getAllTenki();

// function sleep(g) {
//   setTimeout(function() {
//     g.next('I woke up at ' + new Date());
//   }, 1000);
// }

// var g = (function *() {
//     console.log('start');
//     let str = '';
//     console.log(yield sleep(g));
//     str += yield sleep(g);
//     console.log(yield sleep(g));
//     console.log(yield sleep(g));
//     console.log('end');
// })();

// g.next();


// getTenki(URL1)
// .then((res)=>{
//     console.log(res);
//     return getTenki(URL2);
// })
// .then((res)=>{
//     console.log(res);
//     return getTenki(URL3);
// });

// getTenki(URL1,(res)=>{
//     console.log(res);
//     getTenki(URL2,(res2)=>{
//         console.log(res2);

//         getTenki(URL3,(res3)=>{
//             console.log(res3);
//         });
//     });
// });

// //1個目のリクエスト
// http.get(URL1, (res) => {
//   let body = '';
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//       body += chunk;
//   }); 

//   res.on('end', (res) => {
//       res = JSON.parse(body);
//       console.log(res.forecasts[0]);

//       //二個目のリクエスト
//     http.get(URL2, (res) => {
//         let body = '';
//         res.setEncoding('utf8');
//         res.on('data', (chunk) => {
//             body += chunk;
//         });

//         res.on('end', (res) => {
//             res = JSON.parse(body);
//             console.log(res.forecasts[0]); 
//         });
//         }).on('error', (e) => {
//         console.log(e.message); //エラー時
//     });
    
//   });
// }).on('error', (e) => {
//   console.log(e.message); //エラー時
// });
// // axios({
// //   url: URL,
// //   method: 'get',
// //   headers: {"Access-Control-Allow-Origin": "*"},
// // })
// // .then((response) => {
// //     console.log(response);
// // })
// // .catch((error) => {
// //     console.log(error);
// // });