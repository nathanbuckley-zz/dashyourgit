/*
Express server for backend of dashboard
*/

var express = require('express'),
app = express(),
io = require('socket.io'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
port = process.env.PORT || 1337;



//config ---------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true })); //support encoded bodies (x-www-form-urlencoded)
app.use(bodyParser.json()); //support json encoded bodies
app.use(express.static(__dirname + '/public'));


// FORM ROUTES ---------------------------------------------

app.post('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.post('/submit', function (req, res) {
  res.send(req.body);
  console.log(req.body);
  fs.writeFile('config.json', req.body,function(err){
    if(err) throw err;
    console.log('config file saved');
  });
});


// START THE SERVER ---------------------------------------------

var server = app.listen(port, function(){
  var host = server.address().address;
  console.log('listening on: ' + host + ':' + port);
});
