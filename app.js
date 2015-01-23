var express = require('express');
var app = express();
var http = require('http');
var cors = require('express-cors');

app.use(cors({
    allowedOrigins: [
        'fiddle.jshell.net'
    ]
}))

app.get('/', function (req, res) {

var callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
  console.log(chunk);
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
	res.send(str);
  });
  
};


http.request('http://qrng.anu.edu.au/API/jsonI.php?length=1024&type=uint8', callback).end();
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})