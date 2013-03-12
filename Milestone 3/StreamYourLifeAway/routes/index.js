// include database file, this will automatically connect to database
var database = require("../database/db.js");

// handle get request for home page
exports.index = function(req, res){
  res.render('index');
};

// handle get request for top played page
exports.topPlayed = function(req, res){
 // dynamically load top 6 links
  database.loadData(req,res);
};

// handle get request for search page
exports.search = function(req, res,link){
  if(typeof(link)== "function")	link = "";
  
  res.render('search',{title : link});
};

//handle post request from search page
exports.postSearch = function(request,response){
	// Turn link into embededded link
	var link  = request.body.vidSearch.returnValue;
	var index = link.indexOf("&");
	link = link.slice(0,index);
	
	String.prototype.insert = function (index, string) {
		if (index > 0)
			return this.substring(0, index) + string + this.substring(index, this.length);
		else return string + this;
	};
	index = link.indexOf("m")+1;
	link = link.insert(index,"/embed").replace("watch?v=","");
	
	// print the embeded link
	console.log(link);
	
	var artist = request.body.vidSearch.artist;
	var title = request.body.vidSearch.title;
	
	// save the the video to database
	database.saveData(title,artist,link);
	
	// redirect to the search page and pass in the new video
	exports.search(request,response,link);
};