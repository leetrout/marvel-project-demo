// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
var api = require('marvel-api');
 
var marvel = api.createClient({
  publicKey: process.env.PUBLIC_KEY
, privateKey: process.env.PRIVATE_KEY
});

// https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=spider-man
const spiderManID = '1009610';
let spiderManData;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/spiderman', (request, response) => {
  if (!spiderManData) {
    marvel.characters.find(spiderManID)
    .then((r) => {
      spiderManData = r.data
      response.send(spiderManData);
    })
    .fail((r) => {
      console.error(r);
      response.send({"error": true});
    })
    .done();
  } else {
    response.send(spiderManData);
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
