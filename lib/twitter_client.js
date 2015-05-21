require('neon');

var oauth2,
    fs = require('fs'),
    OAuth = require('oauth'),
    OAuth2 = OAuth.OAuth2,
    config = JSON.parse(fs.readFileSync('config/config.json', 'utf-8'));

var Twit = require('twit')

var T = new Twit({
    consumer_key:         config.twitterConsumerKey,
    consumer_secret:      config.twitterConsumerSecret,
    access_token:         config.clientKey,
    access_token_secret:  config.clientSecret
});

var TwitterClient = Class('TwitterClient')({

  get : function get (cb) {
    T.get('statuses/mentions_timeline', {},function (err, data) {
      cb(data);
    });
  },

  post : function post (post) {
    T.post('statuses/update', { status: post }, function(err, data, response) {
    });
  }

});

TwitterClient.get(function(mentions){
  mentions.forEach(function mentionsIterator (mention, index) {
    TwitterClient.post('sup! @'+mention.user.screen_name);
  });
});

module.exports = TwitterClient;