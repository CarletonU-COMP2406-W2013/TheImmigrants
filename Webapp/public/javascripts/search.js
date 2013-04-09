window.onload = function()	{
	// add autocomple to input fields on load
	$("#inputArtist").typeahead({
		source: JSON.parse(autocomplete1) || {}
	});
	$("#inputTitle").typeahead({
		source: JSON.parse(autocomplete2) || {}
	});
	//check if server has passed in a youtube link
	var x = document.getElementById('returnField').value;
	if( x !== ""){
		  // if server passed the request a youtube link make an iframe from it
		ifrm = document.createElement("IFRAME"); 
		ifrm.setAttribute("src",x ); 
		ifrm.style.width = 700+"px"; 
		ifrm.style.height = 300+"px"; 
		document.forms.form.appendChild(ifrm); 
	}
}

function vidSearch(form)	{
		//Code for correcting improper capitalization taken from Stack Overflow
		String.prototype.capitalize = function() {
			return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
		};

		// get song Artist and title from form input fields 
		var keyWord1 = document.getElementById("inputArtist").value;
		var keyWord2 = document.getElementById("inputTitle").value;
		keyWord1 = keyWord1.toLowerCase().capitalize();
		keyWord2 = keyWord2.toLowerCase().capitalize();
		var searchWord = keyWord1+" "+keyWord2;
		
		 //creation of youtube search script 
       		 var script = document.createElement('script');
       		 script.setAttribute('id', 'jsonScript');
        	 script.setAttribute('type', 'text/javascript');
       		 script.setAttribute('src', 'http://gdata.youtube.com/feeds/' + 
                   'videos?vq='+searchWord+'&max-results=1&' + 
                   'alt=json-in-script&callback=ytReturnLink&' + 
                   'orderby=relevance&sortorder=descending&format=5&fmt=18');

            //attach script to current page -  this will submit asynchronous
            //search request, and when the results come back callback 
            //function ytReturnLink(data) is called and the results passed to it
            document.documentElement.firstChild.appendChild(script);
			
}

function ytReturnLink(data){
			
	// extract link from returned data and put it in the hidden field
	// submit the form
	var link = data.feed.entry[0].link[0].href;
        document.getElementById('returnField').value = lnk ;
	document.forms.form.submit();
}
