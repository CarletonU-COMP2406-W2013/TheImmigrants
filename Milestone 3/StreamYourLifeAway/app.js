/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongo = require('mongodb');

// database setup, host variable is local host ip
// mongo db has to be installed
// tutorial at http://www.youtube.com/watch?v=s8CaDhYq6Vw&list=PLw2e3dFxewkIjQ0Kr1LQ-nRlHrqTuPeA8&index=15
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db("StreamYourLifeAway",new mongo.Server(host,port),{safe:true});
db.open(function(error){
	console.log("we are connected to the database");
});

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
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
