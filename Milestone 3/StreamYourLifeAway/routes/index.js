// GET home page

exports.index = function(req, res){
  res.render('index');
};

exports.topPlayed = function(req, res){
  res.render('topPlayed');
};

exports.search = function(req, res,link){
  // if we didnt explicitly pass a link object in it will be equal to function and we can ignore it
  if(typeof(link)== "function")link="";
  // if we passed a link object with must parse it and turn it into an embeded link
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
	//extract the youtube link from the hidden text field
	var youtubeLink = request.body.vidSearch.returnValue;
	console.log("User searched: "+request.body.vidSearch.artist+" "+request.body.vidSearch.title);
	console.log("Youtube link returned is: "+youtubeLink);
	// redirect to the same page and pass in the link
	exports.search(request,response,youtubeLink);
};