/*
Express server for backend of dashboard
*/

var express = require('express'),
app = express(),
server = require('http').Server(app),
io = require('socket.io')(server),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
https = require('https'),
logger = require('morgan'),
collection = require('./DataCollection/collection'),
port = 1337; //change to whatever port you would like to use



//config ---------------------------------------------------

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies (x-www-form-urlencoded)
app.use(bodyParser.json()); //support json encoded bodies
app.use(express.static(__dirname + '/public'));

// OWN MIDDLEWARE ----------------------------------------------


//  DASHBOARD ROUTES ---------------------------------------------

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/personal', function (req, res) {
    var conf = JSON.parse(fs.readFileSync('config.json'));
    //neeed to call userInf & watch for userinfo.json file changes here
    res.sendFile(path.join(__dirname + '/public/html/pubdash.html'));
  });
});

app.get('/org', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/orgdash.html'));
});

app.get('/repo', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/orgdash.html'));
});

app.post('/submitform', function (req, res) {
  var formData = req.body;
  var key = Object.keys(formData)[0];
  //console.log(key);
  console.log(formData);
  fs.writeFile('config.json', JSON.stringify(formData),function(err){
    if(err) throw err;
    console.log('config file saved');
    switch(key){
      case 'gitUrl':
        res.redirect('/personal');
        break;
      case 'orgUrl':
        res.redirect('/org');
        break;
      case 'repoUrl':
        res.redirect('/repo');
        break;
    }
  });
});

//SOCKET IO STUFFS --------------------------------------------

io.on('connection', function(socket){
  console.log('a user accessed login page');
});

// START THE SERVER ---------------------------------------------

server.listen(port, function(){
  var host = server.address();
  console.log('Go to: http://localhost:' + port);
});
