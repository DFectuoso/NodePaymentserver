var express = require('express');
var http = require('http');
var path = require('path');
var superagent = require ('superagent');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/charge',function (req, res) {
  console.log(req.body)
  superagent
    .post('https://api.conekta.io/charges')
    .auth('Yoq79gyM47VzvuscGTKP', '')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/vnd.conekta-v0.3.0+json')
    .send(req.body)
    .end(function(error, conektaRes){
      if(error) return res.send(500,err);

      console.log("Aswered!");

      res.send(conektaRes.body);
    });
});

app.post('/client/create',function (req, res) {
  superagent
    .post('https://api.conekta.io/customers')
    .auth('Yoq79gyM47VzvuscGTKP', '')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/vnd.conekta-v0.3.0+json')
    .send(req.body)
    .end(function(error, conektaRes){
      if(error) return res.send(500,err);

      console.log("Aswered!");

      res.send(conektaRes.body);
    });
});

app.post('/client/addCard',function (req, res) {
  superagent
    .post('https://api.conekta.io/customers/' + req.body.clientId  + '/cards/')
    .auth('Yoq79gyM47VzvuscGTKP', '')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/vnd.conekta-v0.3.0+json')
    .send({token:req.body.token})
    .end(function(error, conektaRes){
      if(error) return res.send(500,err);
      console.log("Aswered!");
      res.send(conektaRes.body);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
