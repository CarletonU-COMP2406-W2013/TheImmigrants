var mongo = require("mongodb");
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db;

exports.connect = function(){
	if(!db){
		var db = new mongo.Db("StreamYourLifeAway", new mongo.Server(host,port),{safe:true});
		db.open(function(error){
			if(error)console.log(error);
			else{
				console.log("we connected to the database");
			}
		});
	}else{
		console.log("we are already connected");
	}
	return db;
}

