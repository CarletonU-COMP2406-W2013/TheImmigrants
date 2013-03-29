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

var updateSearchCount= function()	{
	db.collection("statistics",function(error,collection){
		if(error) console.log("cannot get the collection");
		 else{
			collection.find({type: "searchCount"},function(error,cursor){
				cursor.toArray(function(error,searchCount){
					if(searchCount.length == 0){
						console.log("no searchCount variable found... creating one");
						collection.insert({
							type: "searchCount",
							count: 1,
						},function(){
							console.log("updated searchCount");
						});
					}else{
						currentCount = searchCount[0].count;
						console.log("currentCount is "+ currentCount);
						currentCount = currentCount+1;
						collection.findAndModify({type:"searchCount"},
						[['_id','asc']],
						{$set: {count: currentCount}},
						{},function(error,search){
							console.log("current Search count is:" + currentCount);
						})
					}
					
				});
			});
		 }
	
	});
}
// save a video to the database
exports.saveData = function(Title,Artist,Link){
	db.collection("videos",function(error,collection){
		if(error){
			console.log("couldn't create the collection");
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
							console.log("Inserted Link is:" + Link);
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
	updateSearchCount();
}

exports.getSearchCount = function(req,res){
	db.collection("statistics",function(error,collection){
		collection.find({type : "searchCount"}, function(error,cursor){
			cursor.toArray(function(error,searchCount){
				if(searchCount.length == 0) res.render("index",{TotalSearches: 0});
				else{
					res.render("index",{TotalSearches: searchCount[0].count});
				}
			})
		})
	
	})


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
							res.render('topPlayed',{Videos:videos});
						}
					});
					
				}
			
			});
		}
	});
}

// load info from database
exports.getArtistsAndTitles = function(req, res, link)	{
	db.collection("videos", function(error,collection){
		if(error)console.log("cannot retrieve the collection");
		else{
			console.log("we have the collection");
			collection.find(function(error,cursor)	{
				if(error)console.log(error);
				else{
					cursor.toArray(function(error,videos)	{
						if(error)	console.log("we have an error");
						else {
							console.log("returned videos");
							var length = videos.length;
							var artistNames = new Array(length);
							var titleNames = new Array(length);
							for(var i=0; i<length; i++)	{
								artistNames[i] = videos[i].artist;
								titleNames[i] = videos[i].title;
							}
							res.render('search', {	title:link,
													artists:JSON.stringify(artistNames), 
													titles:JSON.stringify(titleNames),	});
						}
					});	
				}
			});
		}
	});
}

// connect to the database
db = connect();