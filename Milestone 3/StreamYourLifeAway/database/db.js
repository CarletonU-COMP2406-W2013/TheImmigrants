var mongo = require("mongodb");
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;
var db;

// connect to the database
var connect = function(){
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

// save a video to the database
exports.saveData = function(Title,Artist,Link){
db.collection("videos",function(error,collection){
	if(error){
		console.log("couldnt create the collection");
	}else{
		console.log("succesfully created collection");
		collection.find({"link":Link},function(error,cursor){
		cursor.toArray(function(error,videos){
			console.log("executed");
			if(error)console.log(error);
			if(videos.length == 0){
				console.log("cannot find anything so we will insert");
				collection.insert({
					title: Title,
					artist: Artist,
					link: Link,
					count: 1
					},
					function(){
						console.log("succesfully inserted into database");
						console.log("Inserted Link is:"+Link);
						});
			}else{
				console.log("updating video count");
				var newCount = videos[0].count;
				console.log("old video count was"+ newCount);
				collection.findAndModify(
				{link:Link},
				[['_id','asc']], 
				{$set: {count: newCount+1}},
				{},function(err,vid){
					if(error) console.log("problem updating the  video");
					});
				}
			});
		});
	}
});

//end of function
}

// load videos from database
exports.loadData = function(req,res){
	db.collection("videos",function(error,collection){
		if(error)console.log("cannot retrieve the collection");
		else{
			console.log("we have the collection");
			collection.find().limit(6,function(error,cursor){
				if(error)console.log(error);
				else{
					cursor.sort({count:-1}).toArray(function(error,videos){
						if(error)console.log("we have an error");
						else {
							console.log("returned videos");
							var stop = videos.length
							for(i=0;i<6-stop;i++){
								videos.push({artist: undefined,
											title:  undefined,
											link:   undefined});	
							}
							res.render('topPlayed',{Videos:videos});
						}
					});
					
				}
			
			});
		}
	});


}

// connect to the database
db = connect();