'use strict'

const http = require('http');
const HOST = `dotstudio.hipchat.com`;
const PATH = `/v2/room/3035099/notification?auth_token=PnDdb6vPe
2mJWdIRToXEJql7ff7nFbUs6jnClffl`;

function hcPost(postData){
    let postDataStr = JSON.stringify(postData);
    let options = {
            host: HOST,
            port: 80,
            path: PATH,
            method: 'POST',
            headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': postDataStr.length
                    }
    };
    
    let req = http.request(options, (res) => {
          console.log('STATUS: ' + res.statusCode);
          console.log('HEADERS: ' + JSON.stringify(res.headers));
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
                  console.log('BODY: ' + chunk);
                });
    });
    req.on('error', (e) => {
          console.log('problem with request: ' + e.message);
    });
    req.write(postDataStr);
    req.end();
}

module.exports = hcPost;