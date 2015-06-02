/*
Express server for backend of dashboard
*/

var express = require('express'),
app = express(),
io = require('socket.io'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
port = 1337;



//config ---------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies (x-www-form-urlencoded)
app.use(bodyParser.json()); //support json encoded bodies
app.use(express.static(__dirname + '/public'));


// FORM ROUTES ---------------------------------------------

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.post('/submitform', function (req, res) {
  res.send(req.body);
  console.log(req.body);
  fs.writeFile('config.json', JSON.stringify(req.body),function(err){
    if(err) throw err;
    console.log('config file saved');
  });
});


// START THE SERVER ---------------------------------------------

var server = app.listen(port, function(){
  var host = server.address();
  console.log('listening on: ' + JSON.stringify(host));
});
