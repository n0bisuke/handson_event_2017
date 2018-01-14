'use strict'

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

    if (req.method === 'POST') {
        let buffers = [];
        req.on('data', (chunk) => {
            buffers.push(chunk);
        });	
        req.on('end', () => {
            req.rawBody = Buffer.concat(buffers);
            console.log(req.rawBody);

            //書き込み
            fs.writeFile('./fileup/img.jpeg', req.rawBody, 'utf-8', (err) => {
                console.log('書き込み完了！');
            });
        });
    }

}).listen(3000);

//     logging('\n\n\nぽすと');
//     let buffers = [];
//     let cnt = 0;

//     req.on('data', (chunk) => {
//         buffers.push(chunk);
//         // console.log(cnt++);
//         logging(cnt++);
//     });	

//     req.on('end', () => {
//         req.rawBody = Buffer.concat(buffers);
//         console.log(req.rawBody);

//         //書き込み
//         fs.writeFile('./uploads/img.jpeg', req.rawBody, 'utf-8', (err) => {
//             res.send('hey uko');
//             // up(req,res);
//             twUpload((imageUrl)=>{
//                 console.log(imageUrl);
//                 logging(`Twitter アップロード！`);
//                 linePublish(`画像あっぷ！`, imageUrl);
//             });
//         });
//     });
// });