// include database file, this will automatically connect to database
var database = require("../database/db.js");

// handle get request for home page
exports.index = function(req, res){
  database.getSearchCount(function(searchCount){
	res.render("index",{TotalSearches: searchCount });
  });
};

// handle get request for top played page
exports.topPlayed = function(req, res){
 // dynamically load top 6 links
  database.loadData(function(videos){
	res.render('topPlayed',{Videos:videos});
  });
};

// handle get request for search page
exports.search = function(req, res,link){
  if(typeof(link)== "function")	link = "";
  
  database.getArtistsAndTitles(link,function(data){
	res.render('search', data);
  });
};

// handle get request for stream page
exports.stream = function(req, res){
	database.loadData2(function(videos){
		res.render('Stream',{Videos:JSON.stringify(videos),});
	});
}

//handle post request from search page
exports.postSearch = function(request,response){
	// Turn link into embededded link
	var link  = request.body.vidSearch.returnValue;
	var index = link.indexOf("&");
	link = link.slice(0,index);
	
	//Method to fix capitalization taken from stack overflow
	String.prototype.capitalize = function() {
			return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};

	String.prototype.insert = function (index, string) {
		if (index > 0)
			return this.substring(0, index) + string + this.substring(index, this.length);
		else return string + this;
	};
	index = link.indexOf("m")+1;
	link = link.insert(index,"/embed").replace("watch?v=","");
	
	// print the embeded link
	console.log(link);
	
	var artist = request.body.vidSearch.artist.toLowerCase().capitalize();
	var title = request.body.vidSearch.title.toLowerCase().capitalize();
	console.log(artist);
	console.log(title);
	
	// save the the video to database
	database.saveData(title,artist,link);
	
	// redirect to the search page and pass in the new video
	exports.search(request,response,link);
};
