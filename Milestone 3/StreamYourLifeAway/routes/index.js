var db =require("../db.js").connect();
var saveData = function(Title,Artist,Link){
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
								link: Link
							},
							function(){
								console.log("succesfully inserted into database");
							});
						}else{
							console.log("found a video",videos[0]);
						}
					});
			});
		}
	});
}

exports.index = function(req, res){
  res.render('index');
};


exports.topPlayed = function(req, res){
  res.render('topPlayed');
};

exports.search = function(req, res,link){
  // if we didnt explicitly pass a link object in it will be equal to function and we can ignore it
  if(typeof(link)== "function")link="";
  // if we passed a link object we must parse it and turn it into an embeded link
  else{
	var index = link.indexOf("&");
	link=link.slice(0,index);
	String.prototype.insert = function (index, string) {
		if (index > 0)
		return this.substring(0, index) + string + this.substring(index, this.length);
		else return string + this;
	};
	index= link.indexOf("m")+1;
	link=link.insert(index,"/embed");
	link=link.replace("watch?v=","");
	console.log(link);
	
  } 
  // render the html page and pass in the link variable to the hidden text field
  res.render('search',{title : link});
};

exports.postSearch = function(request,response){
	var link = request.body.vidSearch.returnValue;
	var artist = request.body.vidSearch.artist;
	var title = request.body.vidSearch.title;
	saveData(title,artist,link);
	console.log("check blocking");
	exports.search(request,response,link);
};