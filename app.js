var express = require('express');
var app = express();
var request = require('request');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


// app has two routes: search & results.

app.get('/', function(req, res){
  res.render("search");
});

app.get('/results', function(req, res){
  //API call goes here
  var query = req.query.search;
  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query
  request(url, function(error, response, body){
    if(!error & response.statusCode == 200){
      var data = JSON.parse(body);
      res.render('results', {data: data});
      //res.send(results['Search']['0']['Title']);
    }
  });
});




app.listen(3000, function(){
  console.log("muvee app has started.");
});
