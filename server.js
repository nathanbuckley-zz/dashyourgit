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
collection = require('./DataCollection/collection'),
port = 1337; //change to whatever port you would like to use



//config ---------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies (x-www-form-urlencoded)
app.use(bodyParser.json()); //support json encoded bodies
app.use(express.static(__dirname + '/public'));


//  DASHBOARD ROUTES ---------------------------------------------

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/personal', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/pubdash.html'));
  var conf = JSON.parse(fs.readFileSync('config.json'));
  var userApi = {
      hostname: 'api.github.com',
      path: 'users/' + conf.gitUrl,
      headers: {
        'User-Agent': 'DashYourGit'
      }
    }
  var me = JSON.stringify(collection.collect(userApi))
  fs.writeFile('userinfo.json', me, function(err){
    if (err) throw err;
    console.log('user Information Saved');
    console.log(me);
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
