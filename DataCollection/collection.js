var https = require('https');

var collect = function(url){
  var r = '';
  https.get(url, function(res){
    res.on('data',function(data){
      r += data.toString('utf8');
      //console.log(r);
    });
    res.on('end', function(){
      return r;
      console.log(JSON.stringify(r));
    });
  });
}

var userInf = function(un){
  var userDeetsObj = {
    hostname: 'api.github.com',
    path: 'users/' + conf.gitUrl,
    headers: {
      'User-Agent': 'DashYourGit'
    }
  }
  var r = '';
  https.get(userDeetsObj, function(res){
    res.on('data',function(data){
      r += data.toString('utf8');
      //console.log(r);
    });
    res.on('end', function(){
      return r;
      console.log(JSON.stringify(r));
      fs.writeFile('userinfo.json', r, function(err){
      if (err) throw err;
      console.log('user Information Saved');
      console.log(r);
    });
  });
}

exports.collect = collect;
exports.userInf = userInf;
