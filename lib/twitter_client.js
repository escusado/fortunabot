var oauth2,
    OAuth = require('oauth'),
    OAuth2 = OAuth.OAuth2,
    twitterConsumerKey = 'Jg6BBDsRnpZS8g2FirGcjIWJG',
    twitterConsumerSecret = '55cSBklEHdMC08dLM3BB0Al30W3sZCfxMQxRqiFyMZTmkPg78e';

oauth2 = new OAuth2(twitterConsumerKey,
                    twitterConsumerSecret,
                    'https://api.twitter.com/',
                    null,
                    'oauth2/token',
                    null);

oauth2.getOAuthAccessToken('', {'grant_type': 'client_credentials'}, function (e, access_token, refresh_token, results){
  console.log('bearer: ',access_token);
});