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

exports.collect = collect;
