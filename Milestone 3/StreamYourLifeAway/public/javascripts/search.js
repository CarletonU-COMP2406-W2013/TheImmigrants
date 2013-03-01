function vidSearch(form){
		console.log("excuted");
		
		var keyWord1 = document.getElementById("inputArtist").value;
		var keyWord2 = document.getElementById("inputTitle").value;
		var searchWord = keyWord1+" "+keyWord2;
		console.log("user searched: "+searchWord);
	 //create a JavaScript element that returns our JSON data.
            var script = document.createElement('script');
            script.setAttribute('id', 'jsonScript');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                   'videos?vq='+searchWord+'&max-results=1&' + 
                   'alt=json-in-script&callback=ytReturnLink&' + 
                   'orderby=relevance&sortorder=descending&format=5&fmt=18');

            //attach script to current page -  this will submit asynchronous
            //search request, and when the results come back callback 
            //function showMyVideos(data) is called and the results passed to it
            document.documentElement.firstChild.appendChild(script);
			
}

function ytReturnLink(data){
			console.log("entered");
			var feed = data.feed;
            var entries = feed.entry || [];
            var entry = entries[0];
            var playCount = entry.yt$statistics.viewCount.valueOf() + ' views';
            var title = entry.title.$t;
            var lnk =  entry.link[0].href;
            document.getElementById('returnField').value =lnk ;
			console.log("returnField value is:"+document.getElementById('returnField').value);
			
			console.log("submitting form");
			document.forms.form.submit();
			//document.body.appendChild(Hform);
			//Hform.submit();
}