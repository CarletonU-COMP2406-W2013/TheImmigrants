/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


// database setup, host variable is local host ip
// mongo db has to be installed
// tutorial at http://www.youtube.com/watch?v=s8CaDhYq6Vw&list=PLw2e3dFxewkIjQ0Kr1LQ-nRlHrqTuPeA8&index=15

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/topvideos', routes.topPlayed);
app.get('/search', routes.search);
app.post('/search',routes.postSearch);
app.get('/stream',routes.stream);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
