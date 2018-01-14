'use strict';

const Twitter = require('twitter');
const client = new Twitter({
 consumer_key: 'o7zhvQwtV3yW4glMeQp7dj3mX',
 consumer_secret: 'K62e73YHFh82HknLJ7SkdCI2RzKhWMGxHDVLvyDs3yJ2E5Cq2K',
 access_token_key: '59417367-ZoHnrun6tfZbDBwMZLFUIS6CYHUFrAQTYboCKR4PL',
 access_token_secret: 'mJPG4dPNcrmED8kVHIgNvrULyYgw5X02WWWCX9hNryp5C'
});

const params = {screen_name: 'nodejs'};

const main = async () => {
    const tweets = await client.get('search/tweets', {q: 'node.js'});
    const text = tweets.statuses[0].text; //検索して引っかかった1件目のツイート本文
    const res = await client.post('statuses/update', {status: text}); //パクツイ
}

main();

// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//  if (!error) {
//    console.log(tweets);
//  }else{
//      console.error(error);
//  }
// });