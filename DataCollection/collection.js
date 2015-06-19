var http = require('http');

var collect = function(url){
  var r = '';
  http.get(url, function(res){
    res.on('data',function(data){
      r += data;
    });
    res.on('end', function(){
      return r;
    });
  });
}

exports.collect = collect;
